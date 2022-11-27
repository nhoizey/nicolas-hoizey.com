---
date: 2020-09-30 22:14:45 +02:00
title: "Intrinsically Responsive CSS Grid with minmax() and min()"
lang: en
link: https://evanminto.com/blog/intrinsically-responsive-css-grid-minmax-min/
authors:
  - "Evan Minto"
tags: [CSS, Sass, Grid, Rollup]
---

I've been using a CSS Grid layout on some pages here for a while, and had issues with some of it triggering an horizontal scroll on thin viewports bellow 320 pixels.

I couldn't use CSS' `min()` a while ago, because support was not good enough in browsers, but [it has improved a lot](https://caniuse.com/mdn-css_types_min), and I now have more than 95% of visitors supporting it, so I've been able to add it as a progressive enhancement, as Evan shows in this nice article.

> I’m confident that this little fix for CSS Grid is just scratching the surface of the many ways that developers will use these features going forward.

By the way, I'm using Rollup and [`rollup-plugin-scss`](https://www.npmjs.com/package/rollup-plugin-scss), which by default relies on [`node-sass`](https://www.npmjs.com/package/node-sass), so I've been bitten by [this conflict between CSS' `min()` and Sass' `min()`](https://probablerobot.net/2020/05/min-in-css-vs-min-in-libsass/), so I'm now using the Dart Sass version from [the `sass` package on npm](https://www.npmjs.com/package/sass).
