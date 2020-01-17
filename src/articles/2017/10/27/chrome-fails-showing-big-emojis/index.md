---
title: Chrome fails showing big emojis
date: 2017-10-27 12:00:00 +02:00
lang:  en
tags:  [fail, Chrome]
---

It was the first time I really tried to use Web technologies instead of Powerpoint to create slides for a talk. The aim was to be able to demonstrate some cool responsive images features right inside the slides. But when I tried to put big emojis is these slides to emphasize reactions to these features, I discovered Chrome didn't show some of them!

I tried in Firefox, and it did show the emojis without any issue. Unfortunately, Firefox on macOS doesn't have a real fullscreen option appart from the one you can start with JavaScript, so I had to use Chrome.

I found the maximum `font-size` after which Chrome didn't show the emojis anymore was `128px`:

![](chrome-emoji-128px-max.png "Chrome doesn't show emoji for a `font-size` above `128px`")

I tried to circumvent this issue by scaling an emoji with a lower `font-size`, using CSS transformations, but it didn't work either:

![](chrome-emoji-65px-scale-2-either.png "Chrome doesn't show a `65px` emoji scaled twice either")

It looked like the render size was the limit, instead of the actual `font-size`.

Here is the code I used, you can put it directly in the URL field of your browser:

```html
data:text/html;charset=utf-8,<body><p style="margin: 0; font-size:128px">128px: %F0%9F%98%B1</p><p style="margin: 0;font-size:129px">129px: %F0%9F%98%B1</p><p style="margin: 0;font-size:65px; transform: scale(2); transform-origin: top left">65px * 2: %F0%9F%98%B1</p>
```

Then, I discovered the emoji where shown when I put the browser window on another screen, I was really astonished:

{% youtube "XlDxkRq2Gr4" %}

I had forgotten my MacBook 12" screen was a Retina one, which means there were twice the pixels of a standard screen.

So it looks like the actual physical pixels Chrome doesn't want to fill with emojis is above `256px`.

I found the issue had already been [reported on bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/detail?id=719648#c13) by [Tobi Reif](https://twitter.com/TobiReif), so I added my own test case to help fix it.

Tobi had encountered this issue on Chrome mobile on Android, as he showed on [his own test case](https://tobireif.com/posts/maximum_font_size_for_emoji/), for a `font-size` above `54px`. He used a Samsung Galaxy S6, which has [a 4 pixel ratio](https://mydevice.io/devices/#sortSmartphones), so the threshold for him was a rendering size of `54 * 4 = 216 pixels`.

I wonder why it differs from Chrome desktop, it would be nice to test this on several devices to understand more what happens.
