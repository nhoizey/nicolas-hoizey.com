---
date: 2021-10-30 11:19:01 +02:00
title: "Which SVG technique performs best for way too many icons?"
lang: en
link: https://cloudfour.com/thinks/svg-icon-stress-test/
authors:
  - "Tyler Sticka"
tags: [SVG, WebPerf]
---

Using SVG with performance in mind is not an easy topic because there are many ways to show SVG images in pages.

Just yesterday, I chose to [inline all SVG icons](https://github.com/nhoizey/nicolas-hoizey.photo/commit/c3b6656523484f271cd80b9757e459ca7468326c) on [my photography site](https://nicolas-hoizey.photo/) because there's [a bug in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1027106) which downloads my [nice SVG sprite]({% link_to "how-i-build-my-svg-sprites" %}) multiple times for each shown icon…

I agree with Tyler that having so many different icons in one single screen is not so common, so be careful also with UX and DX when you chose your way.

For example, you'll see in Tyler's chart that many "Inline SVG" render faster than an inline "Symbol Sprite". But if your HTML weights 10 times more with many inline SVG, the browser will take more time to get it, so render will start later. "Render time" is not the only useful metric there.

On the DX side, there are multiple tradeoffs to consider. It can be more difficult to maintain an SVG sprite ([here's some help]({% link_to "how-i-build-my-svg-sprites" %})) than a folder with all SVG images. It can be simpler to have all color variants available as individual files, but it's more efficient to have one single SVG per symbol and use CSS to style it in different ways (color, stroke width, etc.), but it's not possible with every method. Difficult choices, and difficult to change once the project is started.

*[UX]: User Experience
*[DX]: Developer Experience
