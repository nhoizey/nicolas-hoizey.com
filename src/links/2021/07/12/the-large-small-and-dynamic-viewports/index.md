---
date: 2021-07-12 09:38:49 +02:00
title: "The Large, Small, and Dynamic Viewports"
lang: en
link: https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/
authors:
  - "Bramus Van Damme"
tags: [CSS, 100vh]
---

Bramus shows how the situation might finally improve for viewport height CSS units, more than 6 years after [I reported the unreliable 100vh value as a bug to webkit]({% link_to "viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers" %}), and webkit replied it was "intended".

Be careful with the upcoming dynamic viewport units (`dvh`/`dvb`, `dvmin` and `dvmax` at least), as using it to size things in the block axis, as [it may generate unpleasant changes in the UI](https://nicolas-hoizey.com/articles/2015/02/18/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers/#june-30th-update).
