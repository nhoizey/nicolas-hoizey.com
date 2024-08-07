---
date: 2019-09-10 11:42:49 +02:00
title: "Caching best practices & max-age gotchas"
lang: en
link: https://jakearchibald.com/2016/caching-best-practices/
authors:
  - "Jake Archibald"
tags: [WebPerf]
---

> Used correctly, <mark>caching is a massive performance enhancement and bandwidth saver</mark>. Favour immutable content for any URL that can easily change, otherwise play it safe with server revalidation. Only mix max-age and mutable content if you're feeling brave, and you're sure your content has no dependancies or dependents that could get out of sync.
