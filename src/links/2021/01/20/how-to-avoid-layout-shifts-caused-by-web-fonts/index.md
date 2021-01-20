---
date: 2021-01-20 10:15:57 +02:00
title: "How to avoid layout shifts caused by web fonts"
lang: en
link: https://simonhearne.com/2021/layout-shifts-webfonts/
authors:
  - name: "Simon Hearne"
    twitter: "SimonHearne"
    site: "https://simonhearne.com/"
tags: [font, WebPerf, UX]
---

> One common cause of layout shift is surprisingly difficult to resolve though: flashes of unstyled text (FOUT).
>
> In this post <mark>we will explore the surprisingly complex world of text rendering on the web and some techniques to remove FOUT while not incurring a CLS penalty.</mark>
> 
> In summary we need to prevent the layout shift by letting the browser render in a fallback system font if it doesn’t get the web font in time, then optimise our fonts to try to get them to the browser before it needs them.

