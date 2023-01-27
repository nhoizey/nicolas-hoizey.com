---
date: 2023-01-27 18:14:06 +01:00
tags: [WebPerf, CLS, CWV]
---

I have a client site with a header that is hidden when the user scrolls down, but shown again when the user scrolls up, which seems pretty comon nowadays.

This triggers some CLS, even if the hide/show is done in less than 500 ms, as “continuous interactions such as scrolls, drags, or pinch and zoom gestures are not considered ‘recent input’”. 😞
