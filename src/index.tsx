import { useRef, useState, useCallback, useEffect } from 'react';

type IntersectionObserverHookRefCallbackNode = Element | null;
type IntersectionObserverHookResult = [
  (node: IntersectionObserverHookRefCallbackNode) => void,
  { entry: IntersectionObserverEntry | undefined }
];

// For more info:
// https://developers.google.com/web/updates/2016/04/intersectionobserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = [0],
}: IntersectionObserverInit = {}): IntersectionObserverHookResult {
  const observerRef = useRef<IntersectionObserver>();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    return () => {
      const observer = observerRef.current;
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const refCallback = useCallback(
    (node: IntersectionObserverHookRefCallbackNode) => {
      function getObserver() {
        // If there is no observer, then create it.
        // So, we only create it only once.
        if (!observerRef.current) {
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              setEntry(entry);
            },
            { root, rootMargin, threshold }
          );
        }

        return observerRef.current;
      }

      const observer = getObserver();
      observer.disconnect();

      if (node) {
        observer.observe(node);
      }
    },
    [root, rootMargin, threshold]
  );

  return [refCallback, { entry }];
}

export default useIntersectionObserver;
