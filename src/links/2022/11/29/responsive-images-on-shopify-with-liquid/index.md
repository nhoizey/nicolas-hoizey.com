---
date: 2022-11-29 23:32:54 +00:00
title: "Responsive images on Shopify with Liquid"
lang: en
link: https://performance.shopify.com/blogs/blog/responsive-images-on-shopify-with-liquid#fixing-oversized-mobile-images
authors:
  - "Sia Karamalegos"
tags: [responsive, image, webperf, Shopify, Liquid]
---

> We launched the `image_tag` and `image_url` filters to help with generating responsive images. Before we dive in, what do these filters do? What are the differences between them?
>
> `image_url` is how we access the Shopify image API to generate image files which are then served from the Shopify CDN. It can resize, crop, add padding, and generate multiple file formats.
>
> `image_tag` is how we generate an HTML <img> tag when given an image URL. It can create all the attributes for that tag while reducing the amount of boilerplate code you have to write.

I'm no longer using Liquid like I did when my sites where built with Jekyll, but I like that Shopify helps developers more easily manage responsive images.

And I love that Sia included a section about preventing oversized images on screens with resolutions higher than what we can see. 😍
