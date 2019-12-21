---
date: 2019-06-18 23:06:47 +02:00
title: "Send Outgoing Webmentions"
lang: en
link: https://remysharp.com/2019/06/18/send-outgoing-webmentions
authors:
  - name: "Remy Sharp"
    twitter: "rem"
tags: [Webmention, IndieWeb]
---

I've been [using Webmention for almost 2 years](/2017/07/so-long-disqus-hello-webmentions.html) now, and I am fortunate to use [Aaron Gustafson](https://twitter.com/aarongustafson)'s [jekyll-webmention_io](https://github.com/aarongustafson/jekyll-webmention_io/) plugin for Jekyll, the static site generator I currently use on this site. Aaron's plugin deals with getting the Webmentions from [webmention.io](https://webmentions.io/), as the name implies, but also with sending mentions to external contents I link to in my own content.

Unfortunately, most other Webmention implementations only deal with receiving, not sending, so Remy Sharp thought it would be a good idea providing such tool: [webmention.app](https://webmention.app/)

> Adding Webmentions to a site seemed straightforward and a well trodden path. Sending outgoing webmentions on the other hand seems to have been generally left to ones own devices.
>
> So I decided to take up the challenge and build a platform agnostic method of sending outgoing webmentions, that anyone can use.

Remy supports several ways to use the tool, even available as a self hosted script.

I will not use it on my current Jekyll powered site, but I will definitely keep it in mind for the probable future migration to [Eleventy](https://www.11ty.io/).
