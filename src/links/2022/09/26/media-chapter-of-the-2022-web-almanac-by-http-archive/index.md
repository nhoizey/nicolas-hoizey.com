---
date: 2022-09-26 20:30:06 +00:00
title: "Media chapter of the 2022 Web Almanac by HTTP Archive"
lang: en
link: https://almanac.httparchive.org/en/2022/media
authors:
  - name: "HTTP Archive"
    twitter: "HTTPArchive"
    site: "https://httparchive.org/"
tags: [image, performance, responsive]
---

I had the honor to review the Media chapter of the 2022 edition of [The Web Almanac](https://almanac.httparchive.org/) by HTTP Archive, "a comprehensive report on the state of the web, backed by real data and trusted web experts".

Once again, it shows that many Web pages are full of oversized images, for multiple reasons, including slow adoption of better modern image formats (AVIF, WebP), and wrong usage of `srcset` and `sizes`:

> 19% `sizes` attribute that were inaccurate enough to affect `srcset` selection on desktop. On mobile, it’s 14%.

Let's hope it will improve over time, we'll check this next year!
