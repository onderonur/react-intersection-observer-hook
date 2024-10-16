import { forwardRef } from 'react';

type BallProps = {
  color: string;
};

export const Ball = forwardRef<React.ComponentRef<'div'>, BallProps>(
  function Ball({ color }, ref) {
    return (
      <div
        ref={ref}
        className="mx-auto mb-12 mt-[110vh] size-24 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  },
);
