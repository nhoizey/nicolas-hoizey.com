---
title: "Using Cloudinary's Fetch API to convert an animated GIF to a video"
date: 2018-08-01 12:00:00 +02:00
lang:  en
tags:  [video, GIF, Cloudinary]
---

I like animated GIFs, like most people these days I think, but they are really heavy, hurting the performance of web pages, and consuming data plans faster than should be needed. So we need to convert them to videos, which are much lighter, for the same visual result. Let's use Cloudinary.

![](/assets/logos/cloudinary.png "The Cloudinary logo"){.logo }

*You need a Cloudinary account to try all of this, but no fear, its **free plan** is really confortable for personnal use or just testing: [signup for Cloudinary](https://nho.io/cloudinary-signup).*

The animations in this post are animated GIFs provided by Giphy and obviously converted by Cloudinary.

{% giphy "12NUbkX6p4xOO4" %}

Cloudinary has been providing animated GIFs to video conversion for a while, as this 4 years old blog post shows: [Reduce size of animated GIFs, automatically convert to WebM and MP4](https://cloudinary.com/blog/reduce_size_of_animated_gifs_automatically_convert_to_webm_and_mp4).

Here is the simple process it described:

First upload the animated GIF to Cloudinary, so that it is available at this URL:

```
https://res.cloudinary.com/demo/image/upload/kitten_fighting.gif
```

Then, change the file extension at the end of the URL to ask Cloudinary to convert it into WebM or MP4 video:

```
https://res.cloudinary.com/demo/image/upload/kitten_fighting.webm
https://res.cloudinary.com/demo/image/upload/kitten_fighting.mp4
```

Easy! Magical!

But **I want my publication process to be even easier**, not requiring any upload (manual or automated) of my digital assets.

{% giphy "C41yP1w3Pe0la" %}

That's why I find [Cloudinary's Fetch API](https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url) awesome!

You can also use Cloudinary's Auto-Upload, which provides [a lot more features](https://cloudinary.com/documentation/fetch_remote_images), but I like to keep things simple, and my master pristine images are hosted on my site anyway. Actually, [my Jekyll-Cloudinary plugin](https://nhoizey.github.io/jekyll-cloudinary/) uses the Fetch API to provide simple and efficient responsive images to Jekyll users.

So, how can we use the Fetch API to convert animated GIFs to videos?

Let's say the pristine animated GIF is located at `https://example.com/anim.gif`.

The simple Fetch API URL to serve this image though Cloudinary, but untouched, would be this:

```
https://res.cloudinary.com/<cloud_name>/image/fetch/https://example.com/anim.gif
```

`<cloud_name>` should be replaced by your own [cloud_name](https://cloudinary.com/documentation/solution_overview#cloud_name).

If we try to replace `.gif` with `.mp4` at the end of this URL, like in the 4 years old Cloudinary post, it won't work, because Cloudinary will try to fetch a video located at `https://example.com/anim.mp4`, which doesn't exist.

{% giphy "5yeHSK4yNQAy4" %}

**The solution** is to use the [explicit format conversion parameter (`f_`)](https://cloudinary.com/documentation/image_transformations#image_format_support) you can set in your Fetch URL, before the pristine image URL:

```
https://res.cloudinary.com/<cloud_name>/image/fetch/f_mp4/https://example.com/anim.gif
```

So, we can replace this:

```html
<img src="https://example.com/anim.gif" alt="an animation">
```

With this:

```html
<video autoplay loop muted playsinline>
  <source src="https://res.cloudinary.com/<cloud_name>/image/fetch/f_webm/https://example.com/anim.gif" type="video/webm">
  <source src="https://res.cloudinary.com/<cloud_name>/image/fetch/f_mp4/https://example.com/anim.gif" type="video/mp4">
  <p>Your browser doesn't support HTML5 video, <a href="https://example.com/anim.gif">download the animated GIF</a>.</p>
</video>
```

{% giphy "uKpWZU3VXLprW" %}

Don't put an `<img>` tag with the animated GIF as the fallback, it would be downloaded anyway, even if the browser supports and shows the video.

Be careful, the transformation can take some time if the animated GIF is really heavy, so you might have to consider uploading it and perform the transformation asynchronously, without using the Fetch API.

I didn't find any of this explained in Cloudinary documentation, maybe because it mixes images and videos.

# One more thing…

If you want to dive deeper in this topic, you can discover how — in the near future — animated GIFs converted to videos could be better loaded in `<img>` tags, with [Colin Bendell](https://twitter.com/colinbendell)'s post in the 2017 edition of Performance (Advent) Calendar: [Evolution of &lt;img&gt;: Gif without the GIF](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/).

# Additional resources

- [Gifhancement – convert GIF to video and embed responsible](https://justmarkup.com/log/2018/02/gifhancement/) by [Michael Scharnagl](https://justmarkup.com/log/servus-hello-and-welcome/)
- [Improve Animated GIF Performance With HTML5 Video](https://www.smashingmagazine.com/2018/11/gif-to-video/) on Smashing Magazine
