---
date: 2022-12-13 12:11:23 +01:00
tags: [SVG, image, WebPerf]
---

⚠️ Be carefull if you use [SVGO](https://github.com/svg/svgo) or [SVGOMG](https://jakearchibald.github.io/svgomg/) to optimize #SVG images using `<symbol>`s.

There's a bug that might remove them when it shouldn't:
https://github.com/svg/svgo/issues/1726

![Screencast of the bug in SVGOMG](svgomg-inline-styles-symbol-bug.gif)