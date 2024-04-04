---
date: 2024-04-04 16:46:17 +02:00
tags: [CSS, WebPerf, image]
---

Most mentions of the magical CSS `object-fit: cover;` in development tutorials should be accompanied by a warning: in most situations, it means the browser will download an image that is larger than required (at least in one direction), and optimization on the server side could be a better option.