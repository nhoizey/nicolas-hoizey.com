---
date: 2022-03-15 15:48:39 +01:00
tags: [Cloudflare, HTTP, webperf, Fastly]
---

TIL: #Cloudflare doesn't support the `Vary` HTTP header, which means the origin server can't do any content negotiation, for example send WebP or AVIF for a JPEG request…

<https://developers.cloudflare.com/cache/about/cache-control/#other>

#Fastly supports it, just saying… 😅
