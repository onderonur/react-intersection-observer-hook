export type IntersectionObserverHookRefCallbackNode = Element | null;
export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefCallbackNode
) => void;
export type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  { entry: IntersectionObserverEntry | undefined }
];
export type TrackVisibilityResult = [
  IntersectionObserverHookRefCallback,
  { isVisible: boolean }
];
