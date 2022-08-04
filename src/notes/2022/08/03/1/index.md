---
date: 2022-08-03 22:45:03 +02:00
tags: [Cloudflare, npm]
---

To have different builds for #Cloudflare Pages previews, I found [`if-env`](https://www.npmjs.com/package/if-env) and [the `CF_PAGES_BRANCH` variable](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables):

```json
{
  "scripts": {
    "build": "if-env CF_PAGES_BRANCH=main && npm run main || npm run preview"
  }
}
```
