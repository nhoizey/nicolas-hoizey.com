---
date: 2021-12-09 18:55:38 +01:00
tags: [image, RWD, WebPerf]
---

Looks like @archdigestindia could improve #WebPerf for their readers and reduce bandwidth invoices…

1. the photo is `564.5px` wide
2. but the `sizes` says the image is full width
3. so the browser downloads an image `414 %` bigger

![An image much bigger than necessary on Architectural Digest India](responsive-image-sizes-error-architectural-digest.png)
