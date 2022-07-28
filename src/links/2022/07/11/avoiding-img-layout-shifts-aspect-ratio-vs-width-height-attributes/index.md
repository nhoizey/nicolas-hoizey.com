---
date: 2022-07-11 15:31:28 +00:00
title: "Avoiding &lt;img&gt; layout shifts: aspect-ratio vs width & height attributes"
lang: en
link: https://jakearchibald.com/2022/img-aspect-ratio/
authors:
  - name: "Jake Archibald"
    twitter: "jaffathecake"
    site: "https://jakearchibald.com/"
tags: [image, responsive, CLS, CWV, performance]
---

Layout shifts are a real annoyance on most sites, so please, read this new gem from Jake, about preventing images layouut shifts the right way… or the right way**s** actually.

> For over a decade, we had to use silly hacks to manually apply an aspect ratio, and then, bloody typical, two better solutions arrived at roughly the same time. They are CSS `aspect-ratio`, and `width` & `height` presentational hints.
