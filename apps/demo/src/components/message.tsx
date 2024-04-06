import * as React from 'react';

type MessageProps = {
  label: string;
  isVisible: boolean;
};

export function Message({ label, isVisible }: MessageProps) {
  return (
    <div className="my-1 border rounded p-2">
      <p className="font-semibold">{label}:</p>
      <p>
        {isVisible
          ? '(づ｡◕‿‿◕｡)づ You have found it!'
          : `¯\\_(ツ)_/¯ I don't know where it is. Use scroll to find it.`}
      </p>
    </div>
  );
}
