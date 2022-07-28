---
title: "Optimizing enlarged images quality with the CSS image-rendering property"
lang:  en
tags:  [CSS, image, responsive]
---

::: lead
I saw [Chris Coyier](https://twitter.com/chriscoyier/) mention [in a tweet](https://twitter.com/chriscoyier/status/1375182445373493249) that there was an issue with code screenshots rendering in Safari, probably because of an [issue with the responsive image code](https://github.com/chriscoyier/coding-fonts/issues/94)[^respimg]. [Eric Portis](https://twitter.com/etportis) shot first replying that it was an [issue with the `sizes` attribute](https://github.com/chriscoyier/coding-fonts/issues/94#issuecomment-807449660)[^srcsetsizes], which is unfortunately pretty common. But this is how I discovered the CSS `image-rendering` property, so I checked, and it looks like a beautiful mess! 😭
:::

[^respimg]: When I read "responsive image" somewhere, I can't stop myself from going to see what it's about, this has been [my pretty invasive hobby since a few years](https://nicolas-hoizey.com/archives/?tags=image&tags=RWD)[^search]! 😅

[^search]: Do you see how [my progressively enhanced archives]({% link_to "enhancing-archives-navigation-step-2" %}) let me find contents attached to a combination of tags, even if this is a staticaly generated site? 💪

[^srcsetsizes]: Remember how Eric showed us all how [`srcset` and `sizes` are an awesome addition to the responsive web toolbox](https://ericportis.com/posts/2014/srcset-sizes/) back in 2014?



There are [5 standard values in the specs](https://www.w3.org/TR/css-images-3/#the-image-rendering): `auto`, `smooth`, `high-quality`, `crisp-edges`, `pixelated`

I guess code code screenshots you would use `pixelated`, if you planned to enlarge images, but as @eeeps said, it was a bug in `sizes`.

But there are [4 values supported by different browsers](https://caniuse.com/?search=css%20image-rendering): `pixelated`, `
