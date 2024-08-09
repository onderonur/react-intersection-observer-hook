import { forwardRef } from 'react';

type BallProps = {
  color: string;
};

export const Ball = forwardRef<React.ElementRef<'div'>, BallProps>(
  function Ball({ color }, ref) {
    return (
      <div
        ref={ref}
        className="mx-auto mb-12 mt-[110vh] h-24 w-24 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  },
);
