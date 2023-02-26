import { useState, useCallback, useRef } from 'react';
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

    if (!node) {
      setEntry(undefined);
      return;
    }

    const observer = observerCache.getObserver({
      root: rootRef.current,
      rootMargin,
      threshold,
    });

    observer.observe(node, (observedEntry) => {
      setEntry(observedEntry);
    });

    observerRef.current = observer;
  }, [rootMargin, threshold]);

  const unobserve = useCallback(() => {
    const currentObserver = observerRef.current;
    const node = nodeRef.current;

    if (node) {
      currentObserver?.unobserve(node);
    }

    observerRef.current = null;
  }, []);

  // React will call the ref callback with the DOM element when the component mounts,
  // and call it with null when it unmounts.
  // So, we don't need an useEffect etc to unobserve nodes.
  // When nodeRef.current is null, it will be unobserved and observe function
  // won't do anything.
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

  return [refCallback, { entry, rootRef: rootRefCallback }];
}

export default useIntersectionObserver;
