---
date: 2023-04-07 19:49:14 +02:00
title: "Running CSS animations only if both the device and the user allow it"
lang:  en
tags:  [CSS]
---

::: lead
Thanks to Chrome release notes, [I discovered today]({% link_to "notes/2023/04/07/1/" %}) that there is [an `update` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update-frequency) which accepts values `fast`, `slow` and `print`, to set styles depending on the ability of the device to update the rendering and the speed of it.

As I'm already respecting the user's preference with the `prefers-reduced-motion` media feature, I wondered how I could progressively enhance this with the new media feature.
:::

[Amelia Bellamy-Royds](https://front-end.social/@AmeliaBR) had [the answer with a clever trick](https://front-end.social/@AmeliaBR/110158330793667431). Thanks Amelia! 🙏

This is how you can apply styles only if a feature is supported by the browser:

```css
@media (thing: one), not (thing: one) {
  …
}
```

Indeed:

- either the browser doesn't understand `thing: one` and ignores both media queries
- or the browser understands `thing: one` and this is either `true` or `false`, so combining both matches all supporting browsers/contexts

Combining this trick with my already existing media queries for the `prefers-reduced-motion` media feature requires a bit of code, but it's manageable.

Here's the code I got for the Ken Burns animations running on [my photography site](https://nicolas-hoizey.photo) (with non relevant selectors cleaned up):

```css
// Without @​media update support
// Enable animations if no reduced motion preference
@media (prefers-reduced-motion: no-preference) {
  img {
    animation-play-state: running;
  }
}

// With @​media update support
@media (update: fast), not (update: fast) {
  // If screen update is fast (neither slow nor print)
  @media (update: fast) {
    // Enable animations if no reduced motion preference
    @media (prefers-reduced-motion: no-preference) {
      img {
        animation-play-state: running;
      }
    }
  }

  // If screen update is NOT fast (either slow or print)
  // Disable animations
  @media not (update: fast) {
    img {
      animation-play-state: paused;
    }
  }
}
```

Being able to nest media queries is great!

Now… how can I test the different permutations of `update` support or not, and actual value? 🤔
