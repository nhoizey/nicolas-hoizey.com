---
date: 2023-05-19 19:47:56 +02:00
title: "HTML and CSS based View Transitions are coming"
lang:  en
tags:  [CSS, View Transitions]
---

::: lead
While same-document View Transitions have now been [available for a while](https://caniuse.com/?search=ViewTransition) in Chromium browsers for Single Page Applications (SPA), they were requiring the use of a JavaScript API. Chrome Canary now allows us to develop and test View Transitions with HTML and CSS only, obviously targeting Multiple Pages Applications (aka Web sites 🤷‍♂️).
:::

# Let's experiment!

After following [Jake Archibald's work](https://developer.chrome.com/docs/web-platform/view-transitions/) for many months now, and sharing [a few links about View Transitions](/links/?tags=View%20Transitions), I wanted to try them, and decided [my photography site](https://nicolas-hoizey.photo) would be a good playground.

Here's what I got with just [a `<meta>` tag](https://github.com/nhoizey/nicolas-hoizey.photo/blob/0ebfd123ab203c330dd24dc1abf2f0a068390b4e/src/_layouts/base.njk#L41) and [a few CSS rules](https://github.com/nhoizey/nicolas-hoizey.photo/blob/0ebfd123ab203c330dd24dc1abf2f0a068390b4e/assets/sass/_view-transitions.scss):

https://youtu.be/Z_MG97DzNPs

Thanks Dave Rupert for the [very simple View Transitions tutorial]({% link_to "getting-started-with-view-transitions-on-multi-page-apps" %})!

There are a few improvements required for when we transition from a small and lightweight thumbnail to a very large and heavy photo (still no [JPEG-XL](/tags/jpeg-xl/)…), so I tried to add a Low Quality Image Placeholder (I usually hate them… 😞) to limit the issue on slow networks. But I guess there should be a better solution if I could keep the thumbnail while the large image loads.

# Ok for Chrome Canary, but elsewhere?

The [documentation for the View Transitions API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) is already available, but focused on SPA.

Noam Rosenthal is currently leading the [creation of a new explainer for "cross-document navigations" (MPA)](https://github.com/WICG/view-transitions/pull/208), a welcome step towards standardisation, and maybe implementation in other browsers.

There are also [a lot of open issues in the CSS Working Group GitHub repository](https://github.com/w3c/csswg-drafts/labels/css-view-transitions-2) with ideas and questions.

Whatever the standardisation and cross-browser implementation status, a really nice thing about View Transitions is that they have been designed as a progressive enhancement, so you can use them right now, even if support is currently low (in terms of browser diversity).

I the mean time, I can only thank Jake Archibald A LOT for this nice improvement of the user experience! 🙏
