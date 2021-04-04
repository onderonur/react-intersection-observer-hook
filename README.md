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
  // `useIntersectionObserver` returns a tuple.
  // We need to give this `ref` callback to the node we want to observe.
  // The second item, `entry` is the response of the initially created `IntersectionObserver` instance.
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return <SomeComponentToTrack ref={ref} />;
}
```

if you have a scrollable container, you can set a `root` like this:

```javascript
import React, { useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
// ...

function Example() {
  const [ref, { entry, rootRef }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return (
    <ScrollableContainer
      // We use `rootRef` callback to set our root node.
      ref={rootRef}
    >
      <SomeComponentToTrack ref={ref} />
    </ScrollableContainer>
  );
}
```

If you just want to track visibility, you can use `useTrackVisibility` hook.
It has the same API as `useIntersectionObserver` hook. It just returns additional fields in its second tuple item.

```javascript
import React, { useEffect } from 'react';
import { useTrackVisibility } from 'react-intersection-observer-hook';
// ...

function Example() {
  // `useTrackVisibility` also returns a tuple like `useIntersectionObserver`.
  // First item is the same `ref` callback to set the node to observe.
  // Second item is an object that we can use to decide if a node is visible.
  // `entry`: Same object which is returned by `useIntersectionObserver`.
  // `rootRef`: Same ref callback which is returned by `useIntersectionObserver`.
  // `isVisible`: Becomes true/false based on the response of `IntersectionObserver`.
  // `wasEverVisible`: When our observed node becomes visible once, this flag becomes `true` and stays like that.
  const [
    ref,
    { entry, rootRef, isVisible, wasEverVisible },
  ] = useTrackVisibility();

  useEffect(() => {
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return <SomeComponentToTrack ref={ref} />;
}
```

## Arguments

Both `useIntersectionObserver` and `useTrackVisibility` gets the same arguments. And those are;

- **rootMargin:** Indicates the margin value around the root element. Default value is zero for all directions (top, right, bottom and left).
- **threshold:** Threshold value (or values) to trigger the observer.

_For more info, you can check [here](https://developers.google.com/web/updates/2016/04/intersectionobserver) and [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)._
