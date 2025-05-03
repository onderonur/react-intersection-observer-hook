import { useState } from 'react';
import useIntersectionObserver, {
  type IntersectionObserverHookArgs,
  type IntersectionObserverHookResult,
} from './use-intersection-observer';

export type TrackVisibilityHookArgs = IntersectionObserverHookArgs & {
  once?: boolean;
};

export type TrackVisibilityHookResult = [
  IntersectionObserverHookResult[0],
  IntersectionObserverHookResult[1] & {
    isVisible: boolean;
  },
];

function useTrackVisibility(
  args?: TrackVisibilityHookArgs,
): TrackVisibilityHookResult {
  const { once, ...rest } = args ?? {};
  const [ref, result] = useIntersectionObserver(rest);
  const isVisible = Boolean(result.entry?.isIntersecting);
  const [isVisibleOnce, setIsVisibleOnce] = useState(isVisible);

  if (once && isVisible && !isVisibleOnce) {
    setIsVisibleOnce(true);
  }

  return [ref, { ...result, isVisible: once ? isVisibleOnce : isVisible }];
}

export default useTrackVisibility;
