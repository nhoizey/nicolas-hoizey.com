---
date: 2019-02-20 12:46:17 +02:00
title: "Font sizing with rem could be avoided"
lang: en
link: https://csswizardry.com/2011/05/font-sizing-with-rem-could-be-avoided/
authors:
  - name: "Harry Roberts"
    twitter: "csswizardry"
tags: [em, rem, "62.5%"]
---

I don't really agree with the simple statement made in the title of this article, as sizing fonts with `rem` is sometimes useful to escape the default cascading sizing, but the most important part here IMHO is the following:

> The main reason, I feel, behind using the 62.5% method is laziness, and that’s a good thing. Good developers are lazy. However that laziness is misguided; it’s actually causing you more work. You have to define font-sizes on all elements rather than just once and letting them inherit and you have to tackle those horrible inheritance issues when an explicitly sized element is placed inside another one.
