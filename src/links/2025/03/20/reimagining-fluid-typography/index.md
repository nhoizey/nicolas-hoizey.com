---
date: 2025-03-20 12:45:18 +00:00
title: "Reimagining Fluid Typography"
lang: en
link: https://www.oddbird.net/2025/02/12/fluid-type/
authors:
  - "Miriam Suzanne"
tags: [font, CSS, em]
---

> Never do pixel math with `em` and `rem` units. That’s where we went wrong, by assuming that `16px == 1em` is a reliable fact.

It reminds me a lot of what I was pretty vocal about a few years ago, including “[People don't change the default 16px font size in their browser (You wish!)]({% link_to "people-don-t-change-the-default-16px-font-size-in-their-browser" %})” and “[Users DO change font size]({% link_to "users-do-change-font-size" %})”.

But I don't understand how this code suggested by Miriam would fix the issue with “some of my favorite sites already using large type become too large when I set my browser preference. So I had to remove that preference.”:

```css
html {
  font-size: clamp(1em, 0.9em + 1vw, 1.5em);
}
```
