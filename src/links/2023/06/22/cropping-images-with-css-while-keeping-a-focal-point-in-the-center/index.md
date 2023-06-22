---
date: 2023-06-22 11:00:55 +00:00
title: "Cropping Images with CSS While Keeping a Focal Point in the Center"
lang: en
link: https://johannesodland.github.io/2023/02/26/cropping-images-with-css-while-keeping-a-focal-point-in-the-center.html
authors:
  - "Johannes Odland"
tags: [image, WebPerf, CSS, Container Queries]
---

This is a lovely way to deal with image crop and focal point with CSS only! 😍

And I love that Johannes put this warning in the beginning:

> While client-side cropping can be an effective way to adapt images further for display on different screens and devices, it can also be a wasteful technique. The downside of cropping on the client is that we discard pixels that we’ve spent resources on transferring and decoding. As a result we end up with <mark>larger file sizes, slower load times, and a less optimal user experience overall</mark>. As such, it’s important to use client-side cropping sparingly and consider alternative responsive image techniques.
