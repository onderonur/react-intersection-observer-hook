# react-intersection-observer-hook

![Build status](https://img.shields.io/github/actions/workflow/status/onderonur/react-intersection-observer-hook/quality.yml)
![License](https://img.shields.io/npm/l/react-intersection-observer-hook)
![Version](https://img.shields.io/npm/v/react-intersection-observer-hook)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a simple to use React hook package for using [Insersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) declaratively. By using this hook, you can easily track if a component is visible or not, create lazy loading images, trigger animations on entering or leaving the viewport, implement infinite loading etc.

**Live demo is [here](https://onderonur.github.io/react-intersection-observer-hook).**

This package relies on [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Browser compatibility can be seen in [here](https://caniuse.com/#feat=intersectionobserver).

If you want to support the browsers those are not supporting it natively, you can use a [polyfill](https://www.npmjs.com/package/intersection-observer).

## Installation

```sh
npm install react-intersection-observer-hook
```

## Usage

```javascript
import React, { useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
// ...

function Example() {
  // `useIntersectionObserver` returns a tuple.
  // We need to give this `ref` callback to the node we want to observe.
  // The second item, `entry` is the response of the `IntersectionObserver` instance.
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return <SomeComponentToTrack ref={ref} />;
}
```

If you have a scrollable container, you can set a `root` like this:

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
      // We use `rootRef` callback to set the root node.
      ref={rootRef}
    >
      <SomeComponentToTrack ref={ref} />
    </ScrollableContainer>
  );
}
```

If you just want to track visibility, you can also use `useTrackVisibility` hook.
It has the same API as `useIntersectionObserver` hook. It just returns additional fields as its second tuple item.

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
  // `isVisible`: Becomes `true`/`false` based on the response of `IntersectionObserver`.
  // `wasEverVisible`: When the observed node becomes visible once, this flag becomes `true` and stays like that.
  const [ref, { entry, rootRef, isVisible, wasEverVisible }] =
    useTrackVisibility();

  useEffect(() => {
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return <SomeComponentToTrack ref={ref} />;
}
```

You can find more usage examples in the `demo` app in this repository.

## Arguments

Both `useIntersectionObserver` and `useTrackVisibility` gets the same arguments. And those are;

- **rootMargin:** Indicates the margin value around the root element. Default value is zero for all directions (top, right, bottom and left).
- **threshold:** Threshold value (or values) to trigger the observer.

_For more info, you can check [here](https://developers.google.com/web/updates/2016/04/intersectionobserver) and [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)._

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://seonghyeonkimm.github.io/"><img src="https://avatars.githubusercontent.com/u/13966404?v=4?s=100" width="100px;" alt="KimSeonghyeon"/><br /><sub><b>KimSeonghyeon</b></sub></a><br /><a href="https://github.com/onderonur/react-intersection-observer-hook/commits?author=seonghyeonkimm" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
