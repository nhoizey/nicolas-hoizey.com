---
date: 2021-07-30 09:16:15 +02:00
tags: [Fastly, Netlify, Cloudinary, HTTP, error]
---

I get a lot of 503 errors from #Fastly in Chrome or Edge, not in Firefox or Safari, for image requests on <https://nicolas-hoizey.photo/> 😱

![503 errors in Chrome](chrome-image-503-error.png)

The requests go to #Netlify then #Cloudinary (here's [how](https://nicolas-hoizey.com/links/2020/11/18/proxying-cloudinary-requests-with-netlify/)), I don't know exactly where Fastly is.
