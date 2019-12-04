# react-intersection-observer-hook

🔨 Under construction... 🔨

This is a React hook to use [Insersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) declaratively. By using this hook, you can easily track if a component is visible or not.

This package is written in TypeScript (all thanks to [TSDX](https://github.com/jaredpalmer/tsdx)). So, you can use it in your TypeScript projects too.

Live demo is [**here**](https://onderonur.github.io/react-intersection-observer-hook).

## Installation

```sh
npm install react-intersection-observer-hook
```

## Usage

Here is a simple code to use the hook. Just pass the `ref callback` to the component that you want to track its visibility. You can find a more complete code in the `example` folder.

```javascript
import React from 'react';
import useIntersectionObserver from 'react-intersection-observer-hook';
// ...

function Example() {
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  return (
    <>
      <p>
        {isVisible
          ? 'The component is visible.'
          : 'The component is not visible.'}
      </p>
      <SomeComponentToTrack ref={ref} />
    </>
  );
};
```

## Props

- **root:** The viewport element to check the visibility of the given target with the ref callback. The default value is the browser viewport.
- **rootMargin:** Indicates the margin value around the root element. Default value is zero for all directions (top, right, bottom and left).
- **threshold:** Threshold value (or values) to trigger the observer.

*For more info, you can check [here](https://developers.google.com/web/updates/2016/04/intersectionobserver) and [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).*
