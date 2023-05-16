---
date: 2023-05-16 10:39:45 +02:00
tags: [WebPerf, Core Web Vitals, LCP, image]
---

Limiting the image density on mobile devices drasticaly improves performance, with no visual loss, so we did it!

![Graph of performance monitoring showing a great improvement of LCP](webperf-core-web-vitals-largest-contentful-paint-lcp.png)

I still wish it was much easier than dealing with `<picture>` and `x` descriptors for fluid images… 😞

With a `<img maxdensity="2.5" …>` attribute for example!

If you agree, comment:
https://github.com/whatwg/html/issues/4421
