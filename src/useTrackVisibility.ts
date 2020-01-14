import useIntersectionObserver, {
  IntersectionObserverHookRefCallback,
} from './useIntersectionObserver';

export type TrackVisibilityResult = [
  IntersectionObserverHookRefCallback,
  { isVisible: boolean }
];

function useTrackVisibility(
  props?: IntersectionObserverInit
): TrackVisibilityResult {
  const [ref, { entry }] = useIntersectionObserver(props);
  const isVisible = Boolean(entry && entry.isIntersecting);
  return [ref, { isVisible }];
}

export default useTrackVisibility;
