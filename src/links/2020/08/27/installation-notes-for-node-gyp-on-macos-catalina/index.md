---
date: 2020-08-27 17:10:13 +02:00
title: "Installation notes for [node-gyp on] macOS Catalina"
lang: en
link: https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md
authors:
  - "node-gyp"
tags: [Node]
---

I was confronted with this error at least once a month for several months (once again yesterday) when trying to `npm install` a freshly checked out Node.js project:

```bash
gyp: No Xcode or CLT version detected!
```

So I guess I should share the link to the official tutorial that helped me fix the issue, every time. I still don't know why this error comes back regularly, but at least now I know how to fix it pretty fast. 👍

And I know I'm not alone, with [more than 40.000 results in Google](https://www.google.com/search?q="gyp%3A+No+Xcode+or+CLT+version+detected!") for the error message… 🤷‍♂️
