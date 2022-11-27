---
title: "Metrics from 1M Sites"
date: 2018-12-06 12:00:00 +02:00
lang: en
link: https://speedcurve.com/blog/metrics-from-1m-sites/
authors:
  - "Steve Souders"
tags: [performance, JavaScript]
---

> What catches my eye are the gaps between TTFB and the paint metrics, and between the paint metrics and First CPU Idle. These gaps are caused by <mark>JavaScript dominating the browser main thread</mark>. This happens after TTFB when all the blocking scripts are executed – these have to finish before any rendering can happen.
>
> The gap between the paint metrics and First CPU Idle is caused by <mark>subsequent scripts being executed and JavaScript frameworks building the DOM dynamically</mark>.

Emphasis is mine.

We really need to be more careful with the way we use JavaScript, and JavaScript libraries/framework, that more than often hurts performance.
