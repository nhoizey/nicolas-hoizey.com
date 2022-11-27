---
date: 2021-02-02 15:41:45 +02:00
title: "Rebuilding my site - Part 1: Eleventy"
lang: en
link: https://carol.gg/blog/site-rebuild-eleventy/
authors:
  - "Carolina Gilabert"
tags: [Eleventy, image, performance]
---

Carol shares the process to build her new site with Eleventy, with a section about image optimisation, a topic I'm very interested in, as you should already know. 😅

> Image management was by far the biggest hurdle.

This really annoys me, it should be much simpler to use images on the Web, and with Eleventy, even with the requirements for responsiveness and performance.

> The first issue I ran into was the location of all my images. I used to colocate blog post images with their respective markdown files. But in order to use Eleventy image plugin, <mark>I had to move all of those to a centralised images folder</mark>.

This is a real issue!

When I was using Jekyll, I had to develop [the jekyll-postfiles plugin](https://nhoizey.github.io/jekyll-postfiles/) to be able to keep the files (images, PDF, zip) alongside their Markdown "container".

When I started using Eleventy, I wondered if I would have to do the same, but fortunately I found another solution, using the same folders hierarchy [in the source](https://github.com/nhoizey/nicolas-hoizey.com/tree/main/src/articles/2020/10/26/enhancing-archives-navigation-step-1) as [in the build](https://nicolas-hoizey.com/articles/2020/10/26/enhancing-archives-navigation-step-1/), and a single command to copy files:

```javascript
eleventyConfig.addPassthroughCopy('src/**/*.{jpg,png,gif,svg,kmz,zip,css}');
```

This way, this image:

<https://github.com/nhoizey/nicolas-hoizey.com/blob/main/src/articles/2020/10/26/enhancing-archives-navigation-step-1/months-pagination-before.jpg>

Goes there online:

<https://nicolas-hoizey.com/articles/2020/10/26/enhancing-archives-navigation-step-1/months-pagination-before.jpg>

Isn't it much easier for content authors to keep the images (and other files) in the same folder as the Markdown, and consider the system folder as an actual content "folder"?

It allows me to work somewhere else on drafts, and move a single folder to the published hierarchy when the content is ready. Same for archiving old content that is no more useful, just one folder to move away.

What I wrote years ago in [The pain of Jekyll’s recommended posts assets management](https://nhoizey.github.io/jekyll-postfiles/#the-pain-of-jekylls-recommended-posts-assets-management) is still true, and is not limited to Jekyll.

I recently saw there's now a [eleventy-plugin-page-assets](https://github.com/victornpb/eleventy-plugin-page-assets/) plugin for Eleventy that does what `jekyll-postfiles` does for Jekyll, good to know for people who don't want the same hierarchy in source and build as I do.

Another concern I have with the way Carol publishes images is that she uses [a shortcode](https://github.com/carolgilabert/carols-blog/blob/master/src/utils/image-shortcode.js), where I prefer to write plain standard Markdown like `![the alt text](months-pagination-before.jpg)`, and have the image preview in context in any Markdown editor, including GitHub!

See <https://github.com/nhoizey/nicolas-hoizey.com/blob/main/src/articles/2020/10/26/enhancing-archives-navigation-step-1/index.md> for example.

Images are not an easy topic, for sure, and there are many ways to tackle the complexity, but I always try to favor the writer's experience over the developer one.

Anyway, this was supposed to be a simple "link" to share, not a full article… 😅
