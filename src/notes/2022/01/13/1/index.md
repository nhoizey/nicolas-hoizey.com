---
date: 2022-01-13 23:19:41 +01:00
tags: [performance, font, Cloudflare]
---

[My photography site](https://nicolas-hoizey.photo) is hosted on #Cloudflare, and they transform `preload` into HTTP/2 push. Great!

But why is my preloaded/pushed font downloaded twice then? 😅

![The same font loaded twice](font-push-download-twice.png)
