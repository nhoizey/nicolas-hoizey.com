---
date: 2022-11-15 12:25:41 +00:00
title: "Why you should never use px to set font-size in CSS"
lang: en
link: https://joshcollinsworth.com/blog/never-use-px-for-font-size
authors:
  - "Josh Collinsworth"
tags: [em, rem, accessibility]
---

> Let’s be very clear: it absolutely *does* matter what unit you use in your CSS. And you should avoid `px` when setting `font-size` wherever possible.

I'm amazed we still have to say this, 9 years after I gave a whole 50 minutes talk about the `em` unit (`rem` was young): [Un petit pas pour l’em, un grand pas pour le Web]({% link_to "talks/2013/10/10/un-petit-pas-pour-l-em-un-grand-pas-pour-le-web" %}).

How can some front-end developers still ignore that [users DO change font size]({% link_to "users-do-change-font-size" %})?

I however understand why most don't know that [the default font size in browsers is not always `16px`]({% link_to "people-don-t-change-the-default-16px-font-size-in-their-browser/" %}#default-font-size-in-browsers-is-always-16px), as this is really rare (Josh even writes "On the web, the default font size is 16px" 🤷‍♂️), but users setting a preferred default and/or minimum font size is not so rare. I use text-only zoom in Firefox really often.

It's also revealing that people don't remember what one `em` originally represented. Josh writes "Em originally referred to the width of an “M” character", but [it was originally actually more related to the height of the character](https://en.wikipedia.org/wiki/Em_(typography)#History).
