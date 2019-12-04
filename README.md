# react-intersection-observer-hook

🔨 Under construction... 🔨

This is a React hook to use [Insersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) declaratively.

Live demo [**here**](https://onderonur.github.io/react-intersection-observer-hook)\*\*.

## Usage

Here is a simple code to use the hook. Just pass the `ref callback` to the component that you want to track its visibility.

```javascript
import React from 'react';
import useIntersectionObserver from '../src';
// ...

const Example = () => {
  const [ref, { entry }] = useIntersectionObserver();

  return (
    <>
      <p>
        {entry && entry.isIntersecting
          ? 'The component is visible.'
          : 'The component is not visible.'}
      </p>
      <SomeComponentToTrack ref={ref} />
    </>
  );
};
```
