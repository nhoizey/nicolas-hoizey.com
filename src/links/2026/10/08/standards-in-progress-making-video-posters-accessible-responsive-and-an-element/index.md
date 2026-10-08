---
date: 2026-10-08 16:23:49 +00:00
title: "Standards In Progress: Making Video Posters Accessible, Responsive, and an Element"
lang: en
link: https://scottjehl.com/posts/responsive-accessible-poster/
authors:
  - "Scott Jehl"
tags: [WebPerf, accessibility, responsive, HTML, video]
---

> I'm showing just a sampling of the available markup here of course–you might want to coordinate multiple art-directed video and picture sources for example, or load eagerly instead of lazily, and add captions for the video. But broadly, by piggybacking on the features that `<img>` already provides, `<poster>` will not only give authors full control over responsive poster image delivery (and features like `fetchpriority`, `sizes="auto"`, `decoding`, and lazy-loading). But also, **for the first time**, using `img` means that poster images can become perceivable and understandable for users with disabilities who rely on assistive technology–by using `alt` text to describe the poster image.
