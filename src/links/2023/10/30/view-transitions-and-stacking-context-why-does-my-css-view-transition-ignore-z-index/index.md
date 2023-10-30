---
date: 2023-10-30 09:33:11 +00:00
title: "View transitions and stacking context: Why does my CSS View Transition ignore z-index?"
lang: en
link: https://www.nicchan.me/blog/view-transitions-and-stacking-context/
authors:
  - "Nic Chan"
tags: [View Transitions, CSS]
---

> Paint order, the order in which your elements are painted, cannot be easily calculated without applying a complex algorithm, especially since many uses of View Transitions involve transitioning between pages. <mark>There isn't really a way to figure out the shared stacking context between two pages</mark>, because if we had to consider the z-index of every page simultaneously to account for every possible transition, our heads/computers might explode.
