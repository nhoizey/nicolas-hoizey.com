---
title: "Using Cloudinary to convert an animated GIF to a video"
date: 2018-08-01 12:00:00 +02:00
lang:  en
tags:  [video, GIF, Cloudinary, webperf]
---

::: lead
I like animated GIFs, like most people these days I think, but they are really heavy, hurting the performance of web pages, and consuming data plans faster than should be needed. So we need to convert them to videos, which are much lighter, for the same visual result. Let's use Cloudinary.
:::

![The Cloudinary logo](/assets/logos/cloudinary.png){.logo }

The animations in this post are animated GIFs provided by Giphy and (obviously) converted by Cloudinary.

{% giphy "12NUbkX6p4xOO4" %}

::: info
You need a Cloudinary account to try all of this, but no fear, the **free plan** is really confortable for personnal use or just testing: [signup for Cloudinary](https://nho.link/cloudinary-signup).
:::

# So, what's the issue with animated GIFs?

Animated GIFs are really popular, thanks to nice cinemagraphs, or funny reaction images. But all these animated GIFs tend to be really really heavy.

This means:

- once the animated GIF starts downloading and rendering, it will increase the load on the browser CPU and memory and make it less responsive
- the user will consume her data-plan faster

# What's the solution?

Current state of the art for dealing with heavy animations is to replace animated GIFs with videos, which are much lighter. Twitter [has been doing for years](https://mashable.com/2014/06/20/twitter-gifs-mp4/), for example. Giphy even provides MP4 alternatives to their animated GIFs.

Videos decoding can even be done by the device GPU, which means the CPU will not suffer like with animated GIFs, and the rendering will be smooth.

# What about the easy autoplay of animated GIFs?

Inline videos without a sound track, or muted, can be set to autoplay since:
- [Chrome for Android 53](https://developers.google.com/web/updates/2016/07/autoplay) (2016)
- [iOS 10](https://webkit.org/blog/6784/new-video-policies-for-ios/) (also 2016)

# Ok, so which video format?

We only need one video format, MP4 encoded as `H.264/AAC`, because (almost) [all browsers now support it](https://caniuse.com/#feat=mpeg4):

{% caniuse "mpeg4" %}

But adding WebM encoded as `VP9/Opus` can save a few more bytes, which is what we try to do here. And WebM support is pretty good:

{% caniuse "webm" %}

If you encode and host video files yourself, you could choose to use only MP4, to ease video creation and lower storage capacity requirements.

But if you don't have these concerns, for example because you use a CDN where storage is cheap and costs depend more on bandwidth, you should use both formats.

# How can Cloudinary help?

Cloudinary has been providing animated GIFs to video conversion for a while, as this blog post from 2014 shows: [Reduce size of animated GIFs, automatically convert to WebM and MP4](https://cloudinary.com/blog/reduce_size_of_animated_gifs_automatically_convert_to_webm_and_mp4).

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

# Don't use the animated GIF has a fallback

Be careful if you put the source animated GIF has a `<img>` fallback for the `<video>` for browsers that don't support HTML5 videos, because it will always be downloaded!

If you need to publish animated GIFs anyway, at least make sure they are not too heavy (500KB should really be a maximum IMHO). You can use tools like [Lossy GIF](https://kornel.ski/lossygif) to optimize these animated GIFs.

# Be careful!

The transformation on Cloudinary can take some time if the animated GIF is really heavy, so you might have to consider uploading it and perform the transformation asynchronously, without using the Fetch API.

I didn't find any of this explained in Cloudinary documentation, maybe because it mixes images and videos.

# One more thing…

If you want to dive deeper in this topic, you can discover how — in the near future — animated GIFs converted to videos could be better loaded in `<img>` tags, with [Colin Bendell](https://twitter.com/colinbendell)'s post in the 2017 edition of Performance (Advent) Calendar: [Evolution of &lt;img&gt;: Gif without the GIF](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/).

Apple has been the first to [implement support of soundless videos has `src` attribute of `img` elements in Safari](https://bugs.webkit.org/show_bug.cgi?id=176825).

Chomium [intended to implement it](https://bugs.chromium.org/p/chromium/issues/detail?id=791658), but it was closed as `WontFix`.

# Additional resources

- [Gifhancement – convert GIF to video and embed responsible](https://justmarkup.com/log/2018/02/gifhancement/) by [Michael Scharnagl](https://justmarkup.com/log/servus-hello-and-welcome/)
- [Improve Animated GIF Performance With HTML5 Video](https://www.smashingmagazine.com/2018/11/gif-to-video/) on Smashing Magazine
