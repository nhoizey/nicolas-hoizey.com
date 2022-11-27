---
date: 2020-09-17 09:04:24 +02:00
title: "Netlify redirects and downloads"
lang: en
link: https://adactio.com/journal/17308
authors:
  - "Jeremy Keith"
tags: [JAMstack, technology, Web]
---

I knew about the `download` attribute, but not that it requires for the files to be on the same origin.

Technically, what Jeremy does on Netlify is a rewrite instead of a redirect, thanks to the `200` HTTP status code. The browser still sees the same URL, on the good origin, but [Netlify proxies the request to Amazon S3](https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-service). A true redirect — with a `301` or `302` status code — wouldn't work, I guess.

Also, I really like how Jeremy promotes the Mstack:

> I guess this is JAMstack. Though, given that the J stands for JavaScript, the A stands for APIs, and I’m not using either, <mark>technically it’s Mstack</mark>.

I also promoted the Mstack a few month ago, as the best foundation for progressive enhancement, in [promoting the Mstack](https://nicolas-hoizey.com/articles/2020/05/05/jamstack-is-fast-only-if-you-make-it-so/#promoting-the-aj-mstack-mstack)! 👍
