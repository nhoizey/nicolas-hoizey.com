---
date: 2023-05-24 12:52:09 +02:00
tags: [CSS, image, responsive, WebPerf]
---

Do you know good tutorials and/or examples about dealing with responsive images that are fluid horizontaly, but with a fixed height?

Using `object-fit: cover;` in the CSS is easy, but how can we prevent loading many pixels that will be hidden, without using too many `<source>` in a `<picture>`?