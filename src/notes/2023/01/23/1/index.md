---
date: 2023-01-23 23:37:49 +01:00
tags: [photography, image, performance]
---

Large photos in photo pages of [my photography site](https://nicolas-hoizey.photo) are now progressive JPEGs so that you can see them earlier, even if they weight more than with AVIF or WebP:

![Screenshot of a page with a photo partially loaded](nicolas-hoizey-photo-progressive-jpeg.jpg)

Thanks to [Cloudinary](https://cloudinary.com/blog/progressive_jpegs_and_green_martians#want_to_give_it_a_try_) and [my responsive images plugin for Eleventy](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/), it took me [10 seconds](https://github.com/nhoizey/nicolas-hoizey.photo/commit/ae64a5cdc5989d600ac70eefc8e26d3c9ff5a2f0)! 😍

I wish Google didn't kill JPEG-XL… 😭

I also wish Largest Contenful Paint didn't wait for the full progressive image to be downloaded and rendered.
