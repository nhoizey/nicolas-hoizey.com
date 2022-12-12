---
date: 2022-10-13 15:35:27 +00:00
title: "Speeding Up Async Snippets"
lang: en
link: https://csswizardry.com/2022/10/speeding-up-async-snippets/#the-new-syntax
authors:
  - "Harry Roberts"
tags: [WebPerf, JavaScript]
---

> For all the resulting script is *asynchronous*, the `<script>` block that creates it is fully *synchronous*, which means that the discovery of the script is governed by any and all synchronous work that happens before it, whether that’s other synchronous JS, HTML, or even CSS. Effectively, we’ve hidden the file from the browser until the very last moment, which means we’re completely failing to take advantage of one of the browser’s most elegant internals… the *Preload Scanner*.
