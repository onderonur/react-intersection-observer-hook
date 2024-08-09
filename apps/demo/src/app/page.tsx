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

  const secondBallRef = useCallback(
    (node: React.ElementRef<'div'>) => {
      secondBallRef1(node);
      secondBallRef2(node);
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
    </>
  );

  const rootCallback = useCallback(
    (node: React.ElementRef<'div'>) => {
      firstBallRootRef(node);
      secondBallRootRef1(node);
      secondBallRootRef2(node);
    },
    [firstBallRootRef, secondBallRootRef1, secondBallRootRef2],
  );

  if (!settings.isContentVisible) return null;

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
        </div>
      </div>
      <div>
        {settings.parentType === ParentType.DOCUMENT ? (
          content
        ) : (
          <div ref={rootCallback} className="w-full overflow-auto bg-slate-100">
            {content}
          </div>
        )}
      </div>
    </main>
  );
}
