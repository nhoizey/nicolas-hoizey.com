---
date: 2022-06-04 01:16:57 +02:00
tags: [Node, Netlify]
---

You may have this issue with Node 16.5.1 on #Netlify: `This setting is no longer used. npm stores temporary files in a special location in the cache…`

[Quick fix](https://answers.netlify.com/t/node-v16-15-1-npm-v8-11-0-breaks-some-builds/64367/6?u=nhoizey): put `16.5.0` in an `.nvmrc` file
