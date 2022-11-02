---
date: 2021-03-08 15:54:04 +02:00
title: "JavaScript performance beyond bundle size"
lang: en
link: https://nolanlawson.com/2021/02/23/javascript-performance-beyond-bundle-size/
authors:
  - name: "Nolan Lawson"
    mastodon: "@nolan@toot.cafe"
    site: "https://nolanlawson.com/"
tags: [performance, JavaScript]
---

> There’s a huge focus recently on JavaScript bundle size: how big are your dependencies? Could you use a smaller one? Could you lazy-load it? But I believe we focus on bundle size first and foremost because it’s easy to measure.
>
> That’s not to say that bundle size isn’t important! Just like how you might have left your keys in the streetlight. And heck, you might as well check there first, since it’s the quickest place to look. But <mark>here are some other things that are harder to measure, but can be just as important</mark>:
>
> - Parse/compile time
> - Execution time
> - Power usage
> - Memory usage
> - Disk usage
