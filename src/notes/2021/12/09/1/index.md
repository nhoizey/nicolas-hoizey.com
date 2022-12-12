---
date: 2021-12-09 09:08:28 +01:00
tags: [WebPerf, Cloudflare]
---

I tried to follow @TheRealNooshu advice about #Cloudflare [cache configuration for performance](https://nooshu.com/blog/2021/09/06/migrating-from-github-pages-to-cloudflare-and-netlify/#web-performance) on [my photography site](https://nicolas-hoizey.photo), but it looks like much of my assets are still not cached:

![A low percent of assets are cached](cloudflare-cache.png)

Could it be because the cache TTL is lower than the delay between 2 visits?
