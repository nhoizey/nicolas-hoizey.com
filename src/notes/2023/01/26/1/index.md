---
date: 2023-01-26 15:40:52 +01:00
tags: [JavaScript, IntersectionObserver, security]
---

TIL `IntersectionObserver`'s `rootMargin` only works if the observer is run in the same-origin-domain, [because of privacy concerns](https://w3c.github.io/IntersectionObserver/#privacy):

> There is a risk that the API may be used to probe for information about the geometry of the global viewport itself, which may be used to deduce the user’s hardware configuration. The motivation for disabling the effects of [`rootMargin`](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin) and suppressing [`rootBounds`](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserverentry-rootbounds) for [cross-origin-domain targets](https://w3c.github.io/IntersectionObserver/#intersectionobserver-cross-origin-domain-target) is to prevent such probing.

That why this demo of a sticky navigation with highlighted current section doesn't work in CodePen's default view… 😞

https://codepen.io/nhoizey/pen/QWBrrKB
