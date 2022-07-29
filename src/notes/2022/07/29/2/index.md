---
date: 2022-07-29 22:11:00 +02:00
tags: [HTTP, Cloudflare, "404"]
---

Some tools transform URLs into links, but if the URL was inside parentheses, the link `href` sometimes contains the closing `)`, so the user gets a 404 error… 🤦‍♂️

Fix this on #Cloudflare Pages with a [`_redirect` file](https://developers.cloudflare.com/pages/platform/redirects/):

```
/*) /:splat 301
```
