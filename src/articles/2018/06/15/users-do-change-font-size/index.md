---
title: "Users DO change font size"
date: 2018-06-15 12:00:00 +02:00
lang:  en
tags:  [accessibility, font, em]
promoted: true
---

[Evan Minto](https://twitter.com/VamptVo) wrote a great article showing the [Internet Archive](https://twitter.com/internetarchive) has tested the actual root font-size set by their visitors, and the result shows a lot of people still change the default one: [Pixels vs. Ems: Users DO Change Font Size](https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773).

> we found that the answer is 3.08% of our users. That’s a pretty big number, higher than most counts of the market share of browsers like Internet Explorer, Edge, or Opera Mini.

![](firefox-preferences-root-font-size.jpg "It's easy to change the root font size in browsers, here in Firefox")

I've said it before, several times:

- in my talk at Paris Web 2013 (in french): [Un petit pas pour l’em, un grand pas pour le Web](/2013/10/ma-conference-a-paris-web-2013.html)
- in a post in 2016: [People don't change the default 16px font size in their browser](/2016/03/people-don-t-change-the-default-16px-font-size-in-their-browser.html)

But people still often tell me I'm wrong, it's an edge case not worth taking into account, and using `px` units everywhere is fine.

It's nice to see a renowned organization like Internet Archive work on this topic and come to the same conclusions.

Speaking of conclusions, I very much like the one of Evan Minto's article:

> If 2 to 3% (or more!) of your users are relying on a custom font size, you should know that so you can either support that user preference or make a conscious decision to not support it. Doing anything less is frankly irresponsible, especially considering that users with larger font sizes may be using those sizes to compensate for visual disabilities.
