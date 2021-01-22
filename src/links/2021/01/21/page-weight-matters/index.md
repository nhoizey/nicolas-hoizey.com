---
date: 2021-01-21 15:14:33 +02:00
title: "Page Weight Matters"
lang: en
link: https://blog.chriszacharias.com/page-weight-matters
authors:
  - name: "Chris Zacharias"
    twitter: "zacman85"
    site: "https://www.chriszacharias.com/"
tags: [WebPerf, analytics]
---

> After a week of data collection, the numbers came back… and they were baffling. The average aggregate page latency under Feather had actually INCREASED. <mark>I had decreased the total page weight and number of requests to a tenth of what they were previously and somehow the numbers were showing that it was taking LONGER for videos to load on Feather</mark>. This could not be possible. Digging through the numbers more and after browser testing repeatedly, nothing made sense. I was just about to give up on the project, with my world view completely shattered, when my colleague discovered <mark>the answer: geography</mark>.