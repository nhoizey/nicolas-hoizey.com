---
date: 2020-12-22 10:25:15 +01:00
tags: [webperf]
---

We should use both `dns-prefetch` and `preconnect` (separately) to speed up connexions to additional servers in most browsers:
- [Firefox doesn't support `preconnect` anymore on HTTPS](https://bugzilla.mozilla.org/show_bug.cgi?id=1596935)
- [Safari doesn't support having both in the same instruction](https://bugs.webkit.org/show_bug.cgi?id=197010)
