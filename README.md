# react-intersection-observer-hook

This is a small React hook package to use [Insersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) declaratively. By using this hook, you can easily track if a component is visible or not, create lazy loading images, trigger animations on entering or leaving the screen etc.

This package is written in TypeScript (all thanks to [TSDX](https://github.com/jaredpalmer/tsdx)). So, you can use it in your TypeScript projects too.

**Live demo is [here](https://onderonur.github.io/react-intersection-observer-hook).**

You can check the browser compatibility from [here](https://caniuse.com/#feat=intersectionobserver).

If you want to support the browsers those are not supporting it natively, you can use this [polyfill](https://www.npmjs.com/package/intersection-observer).

## Installation

```sh
npm install react-intersection-observer-hook
```

## Usage

Here is a simple code to use the hook. Just pass the `ref callback` to the component that you want to track its visibility. You can find a more complete code in the `example` folder.

```javascript
import React, { useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
// ...

function Example() {
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  
  useEffect(() => {
    console.log(`The component is ${isVisible ? "visible" : "not visible"}.`)
  },[isVisible])

  return (
    <SomeComponentToTrack ref={ref} />
  );
};
```

or if you just want to track visibility, you can use `useTrackVisibility` hook like this;

```javascript
import React, { useEffect } from 'react';
import { useTrackVisibility } from 'react-intersection-observer-hook';
// ...

function Example() {
  const [ref, { isVisible }] = useTrackVisibility();
  
  useEffect(() => {
    console.log(`The component is ${isVisible ? "visible" : "not visible"}.`)
  },[isVisible])

  return (
    <SomeComponentToTrack ref={ref} />
  );
};
```

## Props

Both `useIntersectionObserver` and `useTrackVisibility` gets the same props. And those are;

- **root:** The viewport element to check the visibility of the given target with the ref callback. The default value is the browser viewport.
- **rootMargin:** Indicates the margin value around the root element. Default value is zero for all directions (top, right, bottom and left).
- **threshold:** Threshold value (or values) to trigger the observer.

*For more info, you can check [here](https://developers.google.com/web/updates/2016/04/intersectionobserver) and [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).*
