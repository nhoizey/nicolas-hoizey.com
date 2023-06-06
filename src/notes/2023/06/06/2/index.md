---
date: 2023-06-06 09:40:35 +02:00
tags: [WebPerf, LCP, Core Web Vitals, image]
---

Apparently, an image whose part above the fold is indeed the largest, but of which only a small part can be seen, can be considered an LCP element, even if another image has a larger part visible... 😭

You can see this for [my photography site](https://nicolas-hoizey.photo) in this WebPageTest result:

https://www.webpagetest.org/vitals.php?test=230606_BiDcN4_4NJ&run=3&cached=0#lcp

![Screenshot from WebPageTest showing the image mostly hidden behind another one is the LCP](webpagetest-lcp-hidden-image.jpg)