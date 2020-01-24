---
title: "The Flexbox Holy Albatross Reincarnated"
date: 2019-01-14 12:00:00 +02:00
lang: en
link: http://www.heydonworks.com/article/the-flexbox-holy-albatross-reincarnated
authors:
  - name: "Heydon Pickering"
    twitter: "heydonworks"
tags: [RWD, Flexbox, CSS, layout]
---

> when you have three items, you’ll be happy with the three-abreast layout and accepting of the single-column configuration. But you might like to avoid the intermediary part where you get a pair of elements on one line followed by a longer element underneath.

![](flexbox-albatros.png)

A great responsive layout trick, without any Media Query, so also usable inside a component of any width, awesome!

As mentioned in Heydon's post, Rémi Parmentier already wrote 3 years ago about his [Fab Four technique to create Responsive Emails without Media Queries](https://medium.freecodecamp.org/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848), but I like how Heydon uses custom properties to make it easier (Yes, Remi could obviously not have used them back then.)

We still do need [container/element queries](https://wicg.github.io/container-queries/), anyway, for other responsiveness needs!
