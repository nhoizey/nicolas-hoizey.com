---
date: 2022-07-29 22:11:00 +02:00
tags: [HTTP, Cloudflare, "404"]
---

Some tools automatically transform URLs into links, but if the URL was inside parenthesis, the link `href` sometimes contains the closing `)`, so when the user clicks the link, he gets a 404 error… 🤦‍♂️

Easy to fix on #Cloudflare Pages with [the `_redirect` file](https://developers.cloudflare.com/pages/platform/redirects/):

```
/*) /:splat 301
```
