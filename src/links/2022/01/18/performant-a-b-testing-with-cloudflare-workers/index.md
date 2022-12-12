---
date: 2022-01-18 15:03:52 +02:00
title: 'Performant A/B Testing with Cloudflare Workers'
lang: en
link: https://philipwalton.com/articles/performant-a-b-testing-with-cloudflare-workers/
authors:
  - "Philip Walton"
tags: [webperf, Cloudflare]
---

> The problem with the current A/B testing tools is they construct the test on the client. They block rendering until they can determine which experiment group the current user should be in, and then they update the DOM based on that experiment’s parameters. On slow connections or low-end devices, this can mean <mark>users are staring at a blank screen for seconds waiting for network requests to finish before rendering can even start</mark>.
>
> Fortunately, with the advent of edge computing, there are now some really good options that are free for most sites and relatively easy to configure yourself. I’ve spent the last few weeks learning how to use Cloudflare Workers to run A/B tests on this blog, and I wanted to share my setup and offer some tips for anyone else looking to do the same.
