import { forwardRef } from 'react';

type BallProps = {
  color: string;
};

export const Ball = forwardRef<React.ElementRef<'div'>, BallProps>(
  function Ball({ color }, ref) {
    return (
      <div
        ref={ref}
        className="w-24 h-24 rounded-full mx-auto mt-[50%]"
        style={{ backgroundColor: color }}
      />
    );
  },
);
