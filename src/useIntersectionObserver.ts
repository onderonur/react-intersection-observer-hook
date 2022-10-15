import { useState, useCallback, useEffect, useRef } from 'react';
import { Omit } from './types';

const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_THRESHOLD = [0];

export type IntersectionObserverHookArgs = Omit<
  IntersectionObserverInit,
  'root'
>;

export type IntersectionObserverHookRefCallbackNode = Element | null;

export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefCallbackNode,
) => void;

export type IntersectionObserverHookRootRefCallbackNode = IntersectionObserverInit['root'];

export type IntersectionObserverHookRootRefCallback = (
  node: IntersectionObserverHookRootRefCallbackNode,
) => void;

export type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  {
    entry: IntersectionObserverEntry | undefined;
    rootRef: IntersectionObserverHookRootRefCallback;
  },
];

// For more info:
// https://developers.google.com/web/updates/2016/04/intersectionobserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
function useIntersectionObserver(
  args?: IntersectionObserverHookArgs,
): IntersectionObserverHookResult {
  const rootMargin = args?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = args?.threshold ?? DEFAULT_THRESHOLD;

  const nodeRef = useRef<IntersectionObserverHookRefCallbackNode>(null);
  const rootRef = useRef<IntersectionObserverHookRootRefCallbackNode>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const unobserve = useCallback(() => {
    // Disconnect the current observer (if there is one)
    const currentObserver = observerRef.current;
    currentObserver?.disconnect();
    observerRef.current = null;
  }, []);

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const root = rootRef.current;
      const options = { root, rootMargin, threshold };
      // Create a observer for current "node" with given options.
      const observer = new IntersectionObserver(([newEntry]) => {
        setEntry(newEntry);
      }, options);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [rootMargin, threshold]);

  const initializeObserver = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  const refCallback = useCallback<IntersectionObserverHookRefCallback>(
    (node) => {
      nodeRef.current = node;
      initializeObserver();
    },
    [initializeObserver],
  );

  const rootRefCallback = useCallback<IntersectionObserverHookRootRefCallback>(
    (rootNode) => {
      rootRef.current = rootNode;
      initializeObserver();
    },
    [initializeObserver],
  );

  useEffect(() => {
    // After React 18, StrictMode unmounts and mounts components to be sure
    // if they are resilient effects being mounted and destroyed multiple times.
    // This a behavior to be sure nothing breaks when off-screen components
    // can preserve their state with future React versions.
    // So in StrictMode, React unmounts the component, clean-up of this useEffect gets triggered and
    // we stop observing the node. But we need to start observing after component re-mounts with its preserved state.
    // So to handle this case, we call initializeObserver here.
    // https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-strict-mode
    initializeObserver();
    return () => {
      // We disconnect the observer on unmount to prevent memory leaks etc.
      unobserve();
    };
  }, [initializeObserver, unobserve]);

  return [refCallback, { entry, rootRef: rootRefCallback }];
}

export default useIntersectionObserver;
