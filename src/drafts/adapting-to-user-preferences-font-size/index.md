---
title: "Adapting to user preferences: font size"
lang:  en
tags:  [UX, accessibility, CSS, em]
---

[Michael Scharnagl](https://twitter.com/justmarkup/)[^feediary] wrote a nice article about standards that allow us to [make our sites adapt to user preferences](https://justmarkup.com/log/2019/02/adapting-to-user-preferences/). He could have talked about the old `Accept-Language` header to adapt to user preferred language, but it will probably be replaced with [the new `Lang` Client Hint](https://twitter.com/mikewest/status/1095945797382877185), so I guess it's a good idea not diving too much into it until then. Another user preference I would like every website to adapt to, that Michael didn't talk about either, is the font size. Let's talk (once again) about this.

[^feediary]: I discovered Michael when [he created Feediary](https://justmarkup.com/log/2018/07/hey-there-feediary-com/), a Web based RSS/Atom feed reader, which is also a PWA.

# Why do we need to adapt to a user's preferred font size?

I guess you already know that most browsers have a default `16px` root font size ([not all!](/2016/03/people-don-t-change-the-default-16px-font-size-in-their-browser.html#default-font-size-in-browsers-is-always-16px)), and [people can change this default value in the settings](https://www.w3.org/TR/WAI-USERAGENT/guidelines.html#tech-configure-text-scale). They might need to accomodate vision impairments (see WCAG 2.1's AA level [Success Criterion 1.4.4: Resize text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)), or make text legible from a larger distance than usual, on a distant TV for example. Or for any other reason, we don't have to know the details.

Yes, [some people DO change font sizes](/2018/06/users-do-change-font-size.html) with some browsers' text only zoom, or in the accessibility settings. Maybe I should have chosen another title for my other article, because when I said [people don’t change the default 16px font size in their browser](/2016/03/people-don-t-change-the-default-16px-font-size-in-their-browser.html), it was not to take literally, even quite the opposite.

Here's another example, where 20 % (yes, **20 %**!) of an iOS app users did set a larger font size:

https://twitter.com/seansan/status/985833601802559488

So, we need it. Take that for granted.

There are several ways to make the texts of a web page adapt to the user preferred font size, and some potential for a new one resolving long standing issues. Hooked? Let's dive:

# Proportional units: `em`, `rem`, `%`

I have already talked and written [a lot about `em` in the past](/tags/em/), the most detailed article being on [24 Jours de Web](http://www.24joursdeweb.fr/), a French advent calendar about the Web:
- [Lâchez prise sans perdre le contrôle grâce à l’unité CSS em](https://www.24joursdeweb.fr/2013/lachez-prise-sans-perdre-le-controle-grace-a-l-unite-css-em/)
- Here's an automatic English translation provided by Google Translate: [Let go without losing control thanks to the CSS unit em](https://translate.google.com/translate?sl=fr&tl=en&u=https%3A%2F%2Fwww.24joursdeweb.fr%2F2013%2Flachez-prise-sans-perdre-le-controle-grace-a-l-unite-css-em%2F)

You should know that [`em`s are recommended by WCAG 2.1 techniques](https://www.w3.org/WAI/WCAG21/Techniques/css/C14), this is not (only) a personal crusade.

You might prefer the more recent `rem` (root `em`) over `em` to deal with cascading issues, but you probably should [use both `em` and `rem`](https://zellwk.com/blog/rem-vs-em/).

And of course [percents can also be used](https://www.w3.org/WAI/WCAG21/Techniques/css/C12), but I tend to prefer more specific units that offer the same result.

When you need to define a component's font size relative to the page root font size, `rem` is awesome.

But if you develop components that will be included on pages that you don't control, the page root font size might have been altered by someone else (Please, please, don't use [the 62.5 % hack](/links/2019/02/font-sizing-with-rem-could-be-avoided.html)!), and `1rem` can be smaller than the user preferred font size. Sad, but true.

If you want to make sure your component never shows text with a font size lower than the user preferred font size, **`em` and `rem` are unfortunately not enough!**

We need a way to "reset" the font size of a component to the user preferred font size.

# `medium`

CSS 2.1 and 2.2's [`font-size` property defined](https://www.w3.org/TR/CSS22/fonts.html#font-size-props) this (emphasis mine):

> The **'medium' value is the user's preferred font size** and is used as the reference middle value.

https://github.com/w3c/csswg-drafts/issues/2430



# `revert`

# `unset`

# `initial`

# Environment Variables: `env(user-font-size)`

We might get in the future a more obvious way to get the user preferred root font size through CSS Environment Variables.

The [CSS Environment Variables Module Level 1 specification](https://drafts.csswg.org/css-env-1/) is a standardization effort based on  [WebKit's proposal for User Agent Properties](https://github.com/w3c/csswg-drafts/issues/1693) (August 4, 2017).

The specification is still a draft, [initiated on April 28, 2018 by Tab Atkins Jr.](https://github.com/w3c/csswg-drafts/issues/1693#issuecomment-385120028), but most browsers already implemented it:

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"></script>

{% caniuse "css-env-function" %}

The draft specification currently only contains [environment variables for "safe" viewport area](https://drafts.csswg.org/css-env-1/#safe-area-insets) (aka the "Notch" on iPhone X and other recent smartphones):

| Name                   | Value      |
|------------------------|------------|
| safe-area-inset-top    | \<length\> |
| safe-area-inset-right  | \<length\> |
| safe-area-inset-bottom | \<length\> |
| safe-area-inset-left   | \<length\> |

> The safe area insets are four environment variables that define a rectangle by its top, right, bottom, and left insets from the edge of the viewport. For rectangular displays, these must all be zero, but for nonrectangular displays they must form a rectangle, chosen by the user agent, such that all content inside the rectangle is visible, and such that reducing any of the insets would cause some content inside of the rectangle to be invisible due to the nonrectangular nature of the display. This allows authors to limit the layout of essential content to the space inside of the safe area rectangle.

![](env-safe-areas.png "The safe and unsafe areas on iPhone X in the landscape orientation, with insets indicated. ([source](https://webkit.org/blog/7929/designing-websites-for-iphone-x/))")

However, WebKit's initial proposal contained other environment variables, including `user-font-size` for user preferred root font size[^constant]:

```css
:root {
  font-size: env(user-font-size);
}
```

[^constant]: The actual code from the proposal used [WebKit's `constant()` function, replaced with `env()` since Safari Technology Preview 41 and the iOS 11.2 beta](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).

This `user-font-size` Environment Variable unfortunately didn't make it into the first specification draft, but there is still hope to get it later, if people ask for it in this Github issue opened by Becca Hughes: [list of predefined variables](https://github.com/w3c/csswg-drafts/issues/2630).

The usage example in WebKit's proposal doesn't make sense however, reducing its attractiveness for developers, because `:root`'s default font size is already set to the user's preferred font size, or the browser's default one if the user didn't change anything.

Let's say we want to set the font size of an element deeply nested in the DOM tree to 1.2x the user preferred font size.

We could use `rem`, but we sometimes work on CSS code for components that are included in pages we don't manage, which might have set a different font size on `:root` or `html`.

We could use `font-size: medium;`, but [it looks like it's not safe](https://github.com/w3c/csswg-drafts/issues/2430), and we would have to nest our element in a parent to get the 1.2x size factor.

So, if we want to make sure our component is accessible (never sets a font size below the one the user asked for), and can set a font size that is a factor of the user preferred font size, `env(user-font-size)` would be the right solution:

```css
.my-nested-element {
  font-size: calc(1.2 * env(user-font-size));
}
```

Please [tell us what's your opinion](https://github.com/w3c/csswg-drafts/issues/2630#issuecomment-465555311)!

*[aka]: as known as
