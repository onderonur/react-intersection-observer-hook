import { useState } from 'react';
import useIntersectionObserver, {
  type IntersectionObserverHookArgs,
  type IntersectionObserverHookResult,
} from './use-intersection-observer';

export type TrackVisibilityHookArgs = IntersectionObserverHookArgs;

export type TrackVisibilityHookResult = [
  IntersectionObserverHookResult[0],
  IntersectionObserverHookResult[1] & {
    isVisible: boolean;
    wasEverVisible: boolean;
  },
];

function useTrackVisibility(
  args?: IntersectionObserverHookArgs,
): TrackVisibilityHookResult {
  const [ref, result] = useIntersectionObserver(args);
  const isVisible = Boolean(result.entry?.isIntersecting);
  const [wasEverVisible, setWasEverVisible] = useState(isVisible);

  if (isVisible && !wasEverVisible) {
    setWasEverVisible(true);
  }

  return [ref, { ...result, isVisible, wasEverVisible }];
}

export default useTrackVisibility;
