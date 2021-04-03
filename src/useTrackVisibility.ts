import { useEffect, useState } from 'react';
import useIntersectionObserver, {
  IntersectionObserverHookArgs,
  IntersectionObserverHookResult,
} from './useIntersectionObserver';

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

  useEffect(() => {
    if (isVisible) {
      setWasEverVisible(isVisible);
    }
  }, [isVisible]);

  return [ref, { ...result, isVisible, wasEverVisible }];
}

export default useTrackVisibility;
