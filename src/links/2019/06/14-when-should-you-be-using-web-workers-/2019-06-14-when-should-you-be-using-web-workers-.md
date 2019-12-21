---
date: 2019-06-14 17:29:08 +02:00
title: "When should you be using Web Workers?"
lang: en
link: https://dassur.ma/things/when-workers/
authors:
  - name: "Surma"
    twitter: "dassurma"
tags: [WebPerf, JavaScript]
---

Surma explains very well how “low-end phones will mostly likely be used by the massive number of people coming online in the next couple of years“, and why we need to take that into account when we design our frontend Web architectures.

Considering that most players on my game [esviji](https://play.esviji.com/) are (I should say "were", as most have deserted now… 😥) from emerging markets:

https://twitter.com/esviji/status/682181353463496705

I guess I should follow Surma's advice for the next iteration of the game (a full rewrite has been planned months ago already… 😅):

> Web Workers help your app run on a wider range of devices. Libraries like Comlink help you utilize workers without losing convenience and development velocity. I think we should question why every platform but the web is fighting for the UI thread to be as free as possible. We need to shift our default approach and help shape the next generation of frameworks.
