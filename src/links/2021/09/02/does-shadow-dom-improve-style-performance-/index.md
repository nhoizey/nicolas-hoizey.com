---
date: 2021-09-02 11:43:55 +02:00
title: "Does shadow DOM improve style performance?"
lang: en
link: https://nolanlawson.com/2021/08/15/does-shadow-dom-improve-style-performance/
authors:
  - "Nolan Lawson"
tags: [CSS, webperf]
---

This article is about style performance improvement with Shadow DOM, but it also contains a useful comparison of selector performance between ids, classes and data attributes:

> ID and class selectors are fast enough that actually it doesn’t matter much whether shadow DOM is used or not – in fact, they’re slightly faster without shadow DOM. This indicates that systems like Svelte, CSS Modules, or good old-fashioned BEM are using the best approach performance-wise.
>
> This also indicates that <mark>using attributes for style encapsulation does not scale well compared to classes</mark>. So perhaps scoping systems like Vue would be better off switching to classes.
