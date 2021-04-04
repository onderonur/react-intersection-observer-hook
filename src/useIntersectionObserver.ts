import { useState, useCallback, useEffect, useRef } from 'react';

const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_THRESHOLD = [0];

// eslint-disable-next-line no-undef
export type IntersectionObserverHookArgs = IntersectionObserverInit;

export type IntersectionObserverHookRefCallbackNode = Element | null;

export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefCallbackNode,
) => void;

export type IntersectionObserverHookRootRefCallbackNode = IntersectionObserverHookArgs['root'];

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

  useEffect(() => {
    return () => {
      // We disconnect the observer on unmount to prevent memory leaks etc.
      unobserve();
    };
  }, [unobserve]);

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

  return [refCallback, { entry, rootRef: rootRefCallback }];
}

export default useIntersectionObserver;
