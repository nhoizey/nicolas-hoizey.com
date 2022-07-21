---
date: 2022-07-21 15:41:30 +00:00
title: "Hydration is Pure Overhead"
lang: en
link: https://www.builder.io/blog/hydration-is-pure-overhead
authors:
  - name: "Miško Hevery"
    twitter: "mhevery"
    site: "http://misko.hevery.com/"
tags: [performance, JavaScript]
---

> The re-execution of code on the client that the server already executed as part of SSR/SSG is what makes hydration pure overhead: that is, <mark>a duplication of work by the client that the server already did</mark>. The framework could have avoided the cost by transferring information from the server to the client, but instead, it threw the information away.
