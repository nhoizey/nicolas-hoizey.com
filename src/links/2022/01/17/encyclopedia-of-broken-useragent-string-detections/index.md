---
date: 2022-01-17 09:05:52 +02:00
title: 'Encyclopedia Of Broken UserAgent String Detections'
lang: en
link: https://www.otsukare.info/2022/01/14/broken-ua-detection
authors:
  - name: 'Karl Dubost'
    site: 'https://www.otsukare.info/'
tags: [User-Agent]
---

Karl shows multiple examples of bad usage of the browsers' User Agent string to try to infer browser type or version identification or supported features.

It's really sad for example to read that [Mozilla's WebCompat team](https://twitter.com/mozwebcompat) (follow also [@webcompat](https://twitter.com/webcompat)) even [considers using Safari's User Agent string for Firefox on iOS](https://github.com/mozilla-mobile/firefox-ios/issues/7309#issuecomment-941829555)… 😕

Many people have been warning for so many years about risks of using the User Agent as a proxy for feature identification[^karl]. Please **stop doing it**, use feature detection and progressive enhancement!

[^karl]: Karl has been [for 10 years at least](http://web.archive.org/web/20111214050129/http://my.opera.com/karlcow/blog/index.dml/tag/user%20agent%20sniffing) already…

I'm really hoping [User Agent strings will be frozen]({% link_to "intent-to-deprecate-and-freeze-the-user-agent-string" %}) in all browsers soon.
