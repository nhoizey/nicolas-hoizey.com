---
date: 2022-08-01 12:18:57 +02:00
tags: [Puppeteer, Chrome, Node]
---

If [Puppeteer](https://pptr.dev/) fills your hard drive with many copies of Chromium, you can

- either use [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core) instead
- or add `puppeteer_skip_chromium_download=true` to your `.npmrc` and also set `puppeteer_executable_path`with Chrome path
