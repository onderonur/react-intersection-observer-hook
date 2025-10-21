import { useCallback, useRef, useState } from 'react';
import { type Omit } from './types';
import { type CachedIntersectionObserver, createObserverCache } from './utils';

const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_THRESHOLD = [0];

export type IntersectionObserverHookArgs = Omit<
  IntersectionObserverInit,
  'root'
>;

// Normally, when a ref callback returns a cleanup function, React does not call
// the ref callback with `null` after React 19.
// But since its types still have `null`, we need to keep it here too.
export type IntersectionObserverHookRefCallbackNode = Element | null;

export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefCallbackNode,
) => VoidFunction;

export type IntersectionObserverHookRootRefCallbackNode =
  IntersectionObserverInit['root'];

export type IntersectionObserverHookRootRefCallback = (
  node: IntersectionObserverHookRootRefCallbackNode,
) => VoidFunction;

export type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  {
    entry: IntersectionObserverEntry | undefined;
    rootRef: IntersectionObserverHookRootRefCallback;
  },
];

type ReinitializeObserverCallback = (args: {
  newNode: IntersectionObserverHookRefCallbackNode;
  newRoot: IntersectionObserverHookRootRefCallbackNode;
}) => void;

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

  const reinitializeObserver = useCallback<ReinitializeObserverCallback>(
    ({ newNode, newRoot }) => {
      function cleanupObserver() {
        const observer = observerRef.current;
        const node = nodeRef.current;

        if (node) {
          observer?.unobserve(node);
          setEntry(undefined);
        }

        observerRef.current = null;
      }

      function initializeObserver() {
        if (!newNode) return;

        const newObserver = observerCache.getObserver({
          root: newRoot,
          rootMargin,
          threshold,
        });

        newObserver.observe(newNode, (observedEntry) => {
          setEntry(observedEntry);
        });

        observerRef.current = newObserver;
        nodeRef.current = newNode;
        rootRef.current = newRoot;
      }

      cleanupObserver();
      initializeObserver();
    },
    [rootMargin, threshold],
  );

  // React will call the ref callback with the DOM element when the component mounts,
  // and call its cleanup function when it unmounts.
  // So, we don't need an useEffect etc to unobserve nodes.
  const refCallback = useCallback<IntersectionObserverHookRefCallback>(
    (node) => {
      reinitializeObserver({ newNode: node, newRoot: rootRef.current });

      return () => {
        reinitializeObserver({ newNode: null, newRoot: rootRef.current });
      };
    },
    [reinitializeObserver],
  );

  const rootRefCallback = useCallback<IntersectionObserverHookRootRefCallback>(
    (rootNode) => {
      reinitializeObserver({ newNode: nodeRef.current, newRoot: rootNode });

      return () => {
        reinitializeObserver({ newNode: nodeRef.current, newRoot: null });
      };
    },
    [reinitializeObserver],
  );

  return [refCallback, { entry, rootRef: rootRefCallback }];
}

export default useIntersectionObserver;
