---
date: 2022-10-14 16:12:21 +02:00
tags: [Lighthouse, WebPerf, CLS, CWV]
---

`width` and `height` attributes on `<img>` help [prevent layout shifts (CLS)](https://web.dev/optimize-cls/#images-without-dimensions-%F0%9F%8C%86). Values [should be unitless integers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-width).

But #Lighthouse sees `100%` as `100`, thanks `parseInt()`…

Do you think it should be improved?

-> https://github.com/GoogleChrome/lighthouse/issues/14449
