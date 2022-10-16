type ObserverCache = Map<string, IntersectionObserver>;

type ObserverCachesByRoot = Map<
  IntersectionObserverInit['root'],
  ObserverCache
>;

export type CachedIntersectionObserver = {
  observe: (
    node: Element,
    callback: (entry: IntersectionObserverEntry) => void,
  ) => void;
  unobserve: (node: Element) => void;
};

export function createObserverCache() {
  const cachesByRoot: ObserverCachesByRoot = new Map();

  const entryCallbacks = new Map<
    Element,
    (entry: IntersectionObserverEntry) => void
  >();

  function getObserver({
    root,
    rootMargin,
    threshold,
  }: IntersectionObserverInit): CachedIntersectionObserver {
    let cacheByRoot: ObserverCache | undefined = cachesByRoot.get(root);

    if (!cacheByRoot) {
      cacheByRoot = new Map<string, IntersectionObserver>();
      cachesByRoot.set(root, cacheByRoot);
    }

    const cacheKey = JSON.stringify({ rootMargin, threshold });
    let observer = cacheByRoot.get(cacheKey);

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = entryCallbacks.get(entry.target);
            callback?.(entry);
          });
        },
        { root, rootMargin, threshold },
      );

      cacheByRoot.set(cacheKey, observer);
    }

    return {
      observe: (
        node: Element,
        callback: (entry: IntersectionObserverEntry) => void,
      ) => {
        entryCallbacks.set(node, callback);
        observer?.observe(node);
      },
      unobserve: (node: Element) => {
        entryCallbacks.delete(node);
        observer?.unobserve(node);
      },
    };
  }

  return { getObserver };
}
