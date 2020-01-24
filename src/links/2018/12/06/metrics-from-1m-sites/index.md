---
title: "Metrics from 1M Sites"
date: 2018-12-06 12:00:00 +02:00
lang: en
link: https://speedcurve.com/blog/metrics-from-1m-sites/
authors:
  - name: "Steve Souders"
    twitter: "Souders"
tags: [WebPerf, JavaScript]
---

> What catches my eye are the gaps between TTFB and the paint metrics, and between the paint metrics and First CPU Idle. These gaps are caused by **JavaScript dominating the browser main thread**. This happens after TTFB when all the blocking scripts are executed – these have to finish before any rendering can happen.
>
> The gap between the paint metrics and First CPU Idle is caused by **subsequent scripts being executed and JavaScript frameworks building the DOM dynamically**.

Emphasis is mine.

We really need to be more careful with the way we use JavaScript, and JavaScript libraries/framework, that more than often hurts performance.
