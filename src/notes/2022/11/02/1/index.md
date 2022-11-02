---
date: 2022-11-02 22:07:46 +01:00
tags: [CSS, responsive]
---

TIL `@media not (min-width: 60rem) { … }` doesn't work in Safari (on both iOS and macOS), while it works on Chromium browsers and Firefox.

Safari requires a media type, like `all`.

So here's the "right" syntax:
`@media not all and (min-width: 60rem) { … }`
