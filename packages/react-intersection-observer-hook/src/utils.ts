type EntryCallback = (entry: IntersectionObserverEntry) => void;

type CachedObserver = {
  observer: IntersectionObserver;
  entryCallbacks: Map<Element, EntryCallback>;
};

type ObserverCache = Map<string, CachedObserver>;

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

  function getObserver({
    root,
    rootMargin,
    threshold,
  }: IntersectionObserverInit): CachedIntersectionObserver {
    let cacheByRoot = cachesByRoot.get(root);

    if (!cacheByRoot) {
      cacheByRoot = new Map();
      cachesByRoot.set(root, cacheByRoot);
    }

    const cacheKey = JSON.stringify({ rootMargin, threshold });
    let cachedObserver = cacheByRoot.get(cacheKey);

    if (!cachedObserver) {
      const entryCallbacks = new Map<Element, EntryCallback>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = entryCallbacks.get(entry.target);
            callback?.(entry);
          });
        },
        { root, rootMargin, threshold },
      );

      cachedObserver = { observer, entryCallbacks };

      cacheByRoot.set(cacheKey, cachedObserver);
    }

    return {
      observe: (
        node: Element,
        callback: (entry: IntersectionObserverEntry) => void,
      ) => {
        cachedObserver.entryCallbacks.set(node, callback);
        cachedObserver.observer.observe(node);
      },
      unobserve: (node: Element) => {
        cachedObserver.entryCallbacks.delete(node);
        cachedObserver.observer.unobserve(node);
      },
    };
  }

  return { getObserver };
}
