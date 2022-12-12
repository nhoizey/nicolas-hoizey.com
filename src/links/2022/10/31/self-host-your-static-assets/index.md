---
date: 2022-10-31 15:47:29 +00:00
title: "Self-Host Your Static Assets"
lang: en
link: https://csswizardry.com/2019/05/self-host-your-static-assets/
authors:
  - "Harry Roberts"
tags: [webperf, CDN]
---

> One of the quickest wins—and one of the first things I recommend my clients do—to make websites faster can at first seem counter-intuitive: <mark>you should self-host all of your static assets</mark>, forgoing others’ CDNs/infrastructure. In this short and hopefully very straightforward post, I want to outline the disadvantages of hosting your static assets ‘off-site’, and the overwhelming benefits of hosting them on your own origin.

Read the full post, [there's an important topic at the end](https://csswizardry.com/2019/05/self-host-your-static-assets/#myth-access-to-a-cdn) that I would have put in the begining: the issues Harry shows are not with CDN per se, more with additional domains. As he says, you should get a CDN for your own main domain, and use it also — on the same domain — for static assets.
