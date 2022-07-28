---
date: 2020-11-18 09:01:55 +02:00
title: "Proxying Cloudinary Requests with Netlify"
lang: en
link: https://timkadlec.com/remembers/2020-11-17-netlify-proxy-requests/
authors:
  - name: "Tim Kadlec"
    twitter: "tkadlec"
    site: "https://timkadlec.com/"
tags: [Netlify, Cloudinary, performance]
---

> So we get reduced data cost, with no extra connection from the browser, and what appears to be pretty negligible cost at the CDN (the difference in response time for the final proxied images versus loading them without Cloudinary in place is barely noticeable in my tests)—and it all took just a few minutes to put into place.

I noticed Tim doesn't use responsive images in his articles, so [I had to try](/notes/2020/11/18/1/) something even better, of course with [Eleventy](/tags/eleventy/) and [my responsive images plugin](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/).

You'll find [the code on GitHub](https://github.com/nhoizey/demo-11ty-netlify-cloudinary) and [the result on Netlify](https://demo-11ty-netlify-cloudinary.netlify.app/).

This is awesome!
