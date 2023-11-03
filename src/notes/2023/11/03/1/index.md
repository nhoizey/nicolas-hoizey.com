---
date: 2023-11-03 12:55:21 +01:00
tags: [WebPerf, image, LCP]
---

Let's say a SPA first load has been optimized with SSR and the LCP image is loaded pretty fast because it's in the HTML.

But the JavaScript then builds a carousel in the DOM, which initially shows the very same image.

I guess there's a second render of the image. How can I check this easily?

Would it make sense that the LCP takes the late second render of the image, instead of the fast first one?
