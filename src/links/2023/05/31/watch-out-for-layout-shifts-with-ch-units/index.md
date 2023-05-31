---
date: 2023-05-31 15:57:53 +00:00
title: "Watch Out for Layout Shifts with ‘ch’ Units"
lang: en
link: https://cloudfour.com/thinks/watch-out-for-layout-shifts-with-ch-units/
authors:
  - "Paul Hebert"
tags: [WebPerf, Core Web Vitals, CLS, CSS]
---

> In our case, we were using `ch` units to define our page layout. This meant that our post content was equal to `50ch` units (or the width of fifty `0` characters all lined up in a row).
> 
> But the width of the `0` character differs from font to font. So when our web font was swapped, the width of `1ch` changed, which impacted our layout […]
