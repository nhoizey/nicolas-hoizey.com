---
date: 2023-06-27 08:14:38 +00:00
title: "What does the image decoding attribute actually do?"
lang: en
link: https://www.tunetheweb.com/blog/what-does-the-image-decoding-attribute-actually-do/
authors:
  - "Barry Pollard"
tags: [image, WebPerf]
---

> So use it on your `<img>` elements if you want. It's maybe good that image components for libraries use this, or that platforms like WordPress set it by default but if you haven't used it on your site (like I haven't on this blog), then don't expect it to magically speed up your images to a noticeable degree. Other attributes like [`loading=lazy`](https://web.dev/browser-level-image-lazy-loading/) (on offscreen images only please!), and [`fetchpriority=high`](https://web.dev/fetch-priority/) (on important images only!) will have a *much larger* impact. As will ensuring your images are not so big that decoding times become a problem. So prioritise those first before worrying about this micro-optimisation.
