---
date: 2025-04-01 12:21:33 +00:00
title: "Item Flow, Part 1: A new unified concept for layout"
lang: en
link: https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/
authors:
  - "Jen Simmons"
  - "Saron Yitbarek"
  - "Elika Etemad"
  - "Brandon Stewart"
tags: [CSS, Masonry, Grid, Flexbox]
---

> As we worked through the details, we started to get excited. Suddenly new features for Flexbox and Grid that people have wanted for years had an obvious home. Things seemed to click together elegantly. New capabilities emerged

This is really an exciting development for CSS layout!

Ok, I first liked [`display: masonry`]({% link_to "masonry-and-good-defaults" %}), then [agreed masonry layout should be based on Grid]({% link_to "should-masonry-be-part-of-css-grid" %}), and now I find this new option even better… 😅

Anyway, like I said earlier, I generaly don't like masonry layout at all.

But I'm really looking forward to being able to write `item-pack: balance;` and throw away [this silly JavaScript solution]({% link_to "/notes/2022/12/16/1/" %}). 😍
