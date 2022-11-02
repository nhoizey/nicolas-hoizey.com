---
date: 2020-11-20 13:33:31 +02:00
title: "Accessible SVG Icons with Inline Sprites"
lang: en
link: https://www.24a11y.com/2018/accessible-svg-icons-with-inline-sprites/
authors:
  - name: "Marco Hengstenberg"
    twitter: "nice2meatu"
    mastodon: "@nice2meatu@mastodon.social"
tags: [SVG, accessibility]
---

> Standing on their own, icons can be misinterpreted […]. The most important issue though: they lack text. Text is the most accessible format for information on the web. Screen readers understand text best and the same applies to most assistive technology, such as translation apps and Braille displays. So, <mark>if we have anything on our web page that’s not text — like icons — we must add text that gives our users the same information. Otherwise we could exclude people from understanding our interfaces</mark>.

I thought having `aria-label` in my [sprite]({% link_to "how-i-build-my-svg-sprites" %})'s `<symbol>` was enough, but it looks like the `aria-label` should be on the SVG with the `<use>` tag instead.
