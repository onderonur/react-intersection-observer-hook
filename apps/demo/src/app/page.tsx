'use client';

import { useCallback, useState } from 'react';
import { useTrackVisibility } from 'react-intersection-observer-hook';
import { Ball } from '../components/ball';
import { Message } from '../components/message';
import {
  ParentType,
  Settings,
  type SettingsValues,
} from '../components/settings';

export default function Page() {
  const [settings, setSettings] = useState<SettingsValues>({
    parentType: ParentType.DOCUMENT,
    isContentVisible: true,
  });

  const [
    firstBallRef,
    { isVisible: isFirstBallVisible, rootRef: firstBallRootRef },
  ] = useTrackVisibility();

  const [
    secondBallRef1,
    { isVisible: isSecondBallVisible1, rootRef: secondBallRootRef1 },
  ] = useTrackVisibility();

  const [
    secondBallRef2,
    { isVisible: isSecondBallVisible2, rootRef: secondBallRootRef2 },
  ] = useTrackVisibility({
    threshold: 0.5,
  });

  const [
    thirdBallRef,
    { isVisible: isThirdBallVisible, rootRef: thirdBallRootRef },
  ] = useTrackVisibility({
    once: true,
  });

  // Merging multiple refs.
  // When we want to use multiple refs on the same element,
  // we need to merge them like this.
  const secondBallRef = useCallback(
    (node: React.ComponentRef<'div'>) => {
      const cleanup1 = secondBallRef1(node);
      const cleanup2 = secondBallRef2(node);

      return () => {
        cleanup1();
        cleanup2();
      };
    },
    [secondBallRef1, secondBallRef2],
  );

  const content = (
    <>
      <div>
        <Ball ref={firstBallRef} color="#1db954" />
      </div>
      <div>
        <Ball ref={secondBallRef} color="#f20404" />
      </div>
      <div>
        <Ball ref={thirdBallRef} color="#f104b2" />
      </div>
    </>
  );

  // Merging multiple root refs.
  // Normally, we don't need to do this for a single ref use on the same root.
  // But since we have multiple refs used on the same root for this demo,
  // we need to merge them.
  const rootCallback = useCallback(
    (node: React.ComponentRef<'div'>) => {
      const cleanup1 = firstBallRootRef(node);
      const cleanup2 = secondBallRootRef1(node);
      const cleanup3 = secondBallRootRef2(node);
      const cleanup4 = thirdBallRootRef(node);

      return () => {
        cleanup1();
        cleanup2();
        cleanup3();
        cleanup4();
      };
    },
    [
      firstBallRootRef,
      secondBallRootRef1,
      secondBallRootRef2,
      thirdBallRootRef,
    ],
  );

  return (
    <main>
      <div className="fixed left-2 top-2 flex max-w-72 flex-col gap-2 rounded bg-slate-400 p-2 text-xs opacity-80">
        <Settings values={settings} onChange={setSettings} />
        <div>
          <Message label="Green ball" isVisible={isFirstBallVisible} />
          <Message label="Red ball" isVisible={isSecondBallVisible1} />
          <Message
            label="More than half of red ball"
            isVisible={isSecondBallVisible2}
          />
          <Message
            label="Pink ball (seen once)"
            isVisible={isThirdBallVisible}
          />
        </div>
      </div>
      {settings.isContentVisible && (
        <div className="min-h-[200vh]">
          {settings.parentType === ParentType.DOCUMENT ? (
            content
          ) : (
            <div
              ref={rootCallback}
              className="mx-8 max-h-80 overflow-auto bg-slate-100"
            >
              {content}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
