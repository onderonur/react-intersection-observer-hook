import * as React from 'react';

type MessageProps = {
  label: string;
  isVisible: boolean;
};

export function Message({ label, isVisible }: MessageProps) {
  return (
    <div className="my-1 rounded border p-2">
      <p className="font-semibold">{label}:</p>
      <p>
        {isVisible
          ? '✅ You have found it!'
          : `👀 I don't know where it is. Use scroll to find it.`}
      </p>
    </div>
  );
}
