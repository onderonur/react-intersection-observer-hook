import { useState, useCallback, useEffect, useRef } from 'react';
import { CachedIntersectionObserver, createObserverCache } from './utils';
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

const observerCache = createObserverCache();

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
  const observerRef = useRef<CachedIntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const observer = observerCache.getObserver({
        root: rootRef.current,
        rootMargin,
        threshold,
      });
      observer.observe(node, (observedEntry) => {
        setEntry(observedEntry);
      });
      observerRef.current = observer;
    }
  }, [rootMargin, threshold]);

  const unobserve = useCallback(() => {
    const currentObserver = observerRef.current;
    const node = nodeRef.current;
    if (node) {
      currentObserver?.unobserve(node);
    }
    observerRef.current = null;
  }, []);

  const refCallback = useCallback<IntersectionObserverHookRefCallback>(
    (node) => {
      unobserve();
      nodeRef.current = node;
      observe();
    },
    [observe, unobserve],
  );

  const rootRefCallback = useCallback<IntersectionObserverHookRootRefCallback>(
    (rootNode) => {
      unobserve();
      rootRef.current = rootNode;
      observe();
    },
    [observe, unobserve],
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
    observe();
    return () => {
      // We disconnect the observer on unmount to prevent memory leaks etc.
      unobserve();
    };
  }, [observe, unobserve]);

  return [refCallback, { entry, rootRef: rootRefCallback }];
}

export default useIntersectionObserver;
