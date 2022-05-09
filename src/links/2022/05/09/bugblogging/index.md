---
date: 2022-05-09 11:27:02 +00:00
title: "Bugblogging"
lang: en
link: https://adactio.com/journal/19043
authors:
  - name: "Jeremy Keith"
    twitter: "adactio"
    site: "https://adactio.com/"
tags: [bug]
---

Jeremy describes how using our blogs to write about bugs and/or solutions can help other people, and how this is rewarding for us.

> That warms the cockles of my heart. It’s very gratifying to know that documenting the bug (and the fix) helped someone out.

Back in 2015, I had an issue with the behavior of some mobile browsers with the `vh` viewport unit, more specifically the `100vh` value, and [blogged about it]({% link_to "viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers" %})[^twitter].

[^twitter]: After ranting on Twitter, of course… 😅

7 years later, it is still the article with the most referers, visitors and [mentions]({% link_to "viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers" %}#reactions), because people encounter this issue every day!

Fortunately, there is now a standard CSS solution, so I added a mention in the begining of my article, linking to [Bramus' article about new viewport units]({% link_to "the-large-small-and-dynamic-viewports" %}), so that people coming here also find the solution.

In addition to blogging about an issue, it is nice to always check if it is already listed in the browser's known issues, or create it. It helps even more.
