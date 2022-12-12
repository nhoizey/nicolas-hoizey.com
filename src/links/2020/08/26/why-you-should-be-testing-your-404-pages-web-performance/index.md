---
date: 2020-08-26 14:59:52 +02:00
title: "Why you should be testing your 404 pages web performance"
lang: en
link: https://nooshu.github.io/blog/2020/08/25/you-should-be-testing-your-404-pages-web-performance/
authors:
  - "Matt Hobbs"
tags: ["404", webperf]
---

Nice overview of the issue encountered by users if your 404 error page weights too much, with actual data from HTTP Archive.

> Assuming that an optimised 404 page is only required because users will mistype a URL in their browser is short-sighted. As the HTTP Archive data has shown, there are many other reasons why a user may encounter a 404 response (even if they have no idea they actually are!). The web performance impact of a users browser loading an unoptimised 404 page can be huge, and it can have a real impact on their experience of your whole site. All it takes is a forgotten file or misplaced ; in some JavaScript, and your users could be encountering it.

I would add[^remind] that looking at 404 errors in your own HTTP server logs (or your CDN ones) will reveal some interesting patterns, like [those from Netlify Analytics I've shown in this note](/notes/2020/08/26/1/).

[^remind]: I could have just linked to [my article written back in 2008](/articles/2008/06/02/surveillez-vos-erreurs-404-elles-peuvent-etre-tres-instructives/) on this topic (!), but it's in French…

Some of these patterns are not listed in Matt's article because these are not resources actually linked from pages, "visible" by HTTP Archive's crawler.

They can be malicious attempts to hack your site (`/wp-login.php` for WordPress for example), files automatically requested by browsers not used by HTTP Archive's crawler (`apple-touch-icon.png` requested only by Safari on iOS for example), etc.

