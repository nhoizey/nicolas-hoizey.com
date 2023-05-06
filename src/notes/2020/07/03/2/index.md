---
date: 2020-07-03 12:33:02 +02:00
tags: [security, CSP, Service Worker, TIL]
---

TIL: if you cache images with a Service Worker, and you have a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), the image's origin should be in both the `img-src` and `connect-src` directives.

Details from @qubyte: https://qubyte.codes/blog/content-security-policy-and-service-workers
