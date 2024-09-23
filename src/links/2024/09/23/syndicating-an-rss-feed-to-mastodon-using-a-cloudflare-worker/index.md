---
date: 2024-09-23 09:36:03 +00:00
title: "Syndicating an RSS feed to Mastodon using a Cloudflare worker"
lang: en
link: https://coryd.dev/posts/2024/syndicating-an-rss-feed-to-mastodon-using-a-cloudflare-worker/
authors:
  - "Cory Dransfeldt"
tags: [RSS, feed, Cloudflare]
---

> Everything shared from my site to Mastodon runs out of a single [all activity RSS feed](https://coryd.dev/feeds/all). […] This feed is populated from a fairly verbose `processContent` collection. It also populates my sitemap and search index since there's plenty of overlap in format and the data being handled. *Anyways.*
>
> Syndicating this `all activity` feed is now being handled by a Cloudflare worker. The worker checks the feed every 15 minutes and once upon the completion of a build.
