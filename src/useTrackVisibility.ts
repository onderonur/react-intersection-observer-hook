import useIntersectionObserver from './useIntersectionObserver';
import { TrackVisibilityResult } from './types';

function useTrackVisibility(
  props?: IntersectionObserverInit
): TrackVisibilityResult {
  const [ref, { entry }] = useIntersectionObserver(props);
  const isVisible = Boolean(entry && entry.isIntersecting);
  return [ref, { isVisible }];
}

export default useTrackVisibility;
