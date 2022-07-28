---
date: 2021-01-08 15:37:45 +02:00
title: "Adjust font size with CSS custom properties"
lang: en
link: https://romaricpascal.is/posts/adjust-font-size-css-custom-properties/
authors:
  - name: "Romaric Pascal"
    twitter: "romaricpascal"
    site: "https://romaricpascal.is/"
tags: [font, performance, CSS, custom properties]
---

I do love beautiful Web fonts, even if there are none on this site currently, so I plan to add at least one soon. I might use this nice solution.

> The aim is to make the loaded font match the fallback font's height. So until that final font is loaded, we don't want to be scaling anything (either through font-size-adjust or custom properties). Before we get to the CSS, let's take care of that by loading the fonts using JavaScript and set a class on the <html> element when they're done.
