---
title: "Using the Markdown image syntax to get responsive images"
lang:  en
tags:  [Markdown, responsive, image, Cloudinary, Eleventy]
---

I've been writing Markdown content for years now. And I wish all websites were using responsive images for performance. Here's why and how I tried to help content writers get great responsive images without having to abandon Markdown's standard image syntax.

First, I want to thank [Mark Boulton](https://markboulton.co.uk/) for [asking the right questions](https://twitter.com/markboulton/status/1270779527548059648) and help me realize that I should share this.

# Mixing Markdown and responsive images

My first serious attempt at mixing Markdown and responsive images was the [Jekyl-Cloudinary](https://nhoizey.github.io/jekyll-cloudinary/) plugin, which provides a Liquid tag to add responsive images to Markdown content used in sites generated with the famous [Jekyll](/tags/jekyll/).

It allowed writing this Liquid tag in Markdown:

```markdown
{% raw %}{% cloudinary cloudinary-pricing.png alt="Cloudinary pricing" caption="Cloudinary pricing and plans, the **free** one is great for bloggers!" %}{% endraw %}
```

And get this HTML:

```html
<figure>
  <img
    src="https://res.cloudinary.com/nho/image/fetch/c_limit,w_800,q_auto,f_auto/https://nicolas-hoizey.com/2016/07/cloudinary-pricing.png"
    srcset="
      https://res.cloudinary.com/nho/image/fetch/c_limit,w_320,q_auto,f_auto/https://nicolas-hoizey.com/2016/07/cloudinary-pricing.png 320w,
      https://res.cloudinary.com/nho/image/fetch/c_limit,w_640,q_auto,f_auto/https://nicolas-hoizey.com/2016/07/cloudinary-pricing.png 640w,
      https://res.cloudinary.com/nho/image/fetch/c_limit,w_960,q_auto,f_auto/https://nicolas-hoizey.com/2016/07/cloudinary-pricing.png 960w,
      https://res.cloudinary.com/nho/image/fetch/c_limit,w_1208,q_auto,f_auto/https://nicolas-hoizey.com/2016/07/cloudinary-pricing.png 1208w"
    sizes="(min-width: 50rem) 50rem, 90vw"
    alt="Cloudinary pricing"
    width="1208"
    height="561"
  />
  <figcaption>Cloudinary pricing and plans, the <strong>free</strong> one is great for bloggers!</figcaption>
</figure>
```

It was great having this complex `<figure>` and responsive image generated automatically from a pretty simple syntax.

I've seen multiple attempts to do the same with [Eleventy](/tags/eleventy/) and shortcodes, like [Eric Portis](https://ericportis.com/)'s [respimg](https://github.com/eeeps/eleventy-respimg/) or [Mark Llobrera](http://dirtystylus.com/)'s [Paired Shortcodes](http://dirtystylus.com/2020/06/16/eleventy-paired-shortcodes-and-markdown-rendering/).

# The issues with tags/shortcodes

But **writing a Liquid tag or Nunjucks shortcode instead of the standard Markdown syntax for images always felt wrong**.

There are multiple issues IMHO:

- I have to **wait for the SSG build to run to actually see the image in the content**
- In my Markdown file editor[^macdown], **the live preview shows the tag/shortcode, not the image** it is supposed to show
- likewise, when **browsing files on GitHub**, opening a Markdown file shows the code, not the image, in the content

*[SSG]: Static Site Generator

[^macdown]: I've been using [Macdown](https://macdown.uranusjr.com/) for years.

When [I moved from Jekyll to Eleventy](/notes/2020/02/28/1/), I knew **I had to create something better**, more friendly for content writers, me included.

# What do we need?

To be able to show the image in the page preview in a local editor or on GitHub:

1. the **standard Markdown syntax for images** has to be used, instead of a tag or shortcode,
2. the **path to the image has to be either absolute** (on the local folders or a remote server), **or relative to the Markdown file** location.

But to be able to use this syntax to generate responsive images with the SSG, there must also be:

3. a way to define **how the image should be rendered layout-wise**, a.k.a. the `sizes` attribute,
4. and a way to "transition" from the pristine image[^pristine] in the sources, to the **multiple resized versions** linked in the HTML's `srcset` attribute.

[^pristine]: we call "pristine" image the untouched — often high definition — source image.

# How did I build this?

After several unsuccessful attempts to write a plugin for Markdown-it, the default Markdown parser in Eleventy, I figured out that dealing with 3 and 4 could be easier from an HTML source than from a Markdown one, so I decided to split the puzzle in two parts:

1. First: transform simple and standard enough Markdown into a simple HTML image with one single `src`
2. Second: transform this simple HTML image into a responsive image with `srcset` and `sizes` attributes

I took the reverse path, starting with the second transformation, aiming at providing a standalone Node.js solution that could be used in any build pipeline or integrated into a Node.js based SSG (Eleventy for example of course, but also Gatsby eventually, etc.).

## How to transform simple HTML image into a responsive image?

This is the part provided by [images-responsiver](https://nhoizey.github.io/images-responsiver/), available [on GitHub](https://github.com/nhoizey/images-responsiver) and [in npm](https://www.npmjs.com/package/images-responsiver).




---

On my own site, I use a not so simple trick, I wish I could make it easier for everyone.

The content folders in the generated site have the same hierarchy as in the source. For exemple, nicolas-hoizey.com/articles/2020/… matches github.com/nhoizey/nicola…

I copy the images from the source to the generated folder with this in Eleventy configuration:
github.com/nhoizey/nicola…

The URL of the image should then be "easy" to get from the URL of the content it is "bundled" with, but Eleventy plugins still lacks some data transmission, so I had to add this to my default template:
github.com/nhoizey/nicola…

`data-img-src` and `data-img-dist` are used by the plugin to compute the full URL of the pristine image, before Cloudinary enhancement.

I understand it is really complex, but I don't like having my content illustrations outside the "content folder" (in a single shared "/assets/" folder for example), so I found this convoluted solution.

If the code of your site is in GitHub, Gitlab or another online repository, I could take some time (maybe not today) to help you with a Pull Request, if you want.

Oh sorry, the filter is there:
https://github.com/nhoizey/nicolas-hoizey.com/blob/master/src/_11ty/filters/file.js#L4-L6

Ok, so `www/` is the folder in which you generate the site?

Do you have a `runBeforeHook` in your plugin configuration, like here: https://github.com/nhoizey/nicolas-hoizey.com/blob/master/src/_11ty/images-responsiver-config.js#L6-L39

If you copy/pasted it from mine, you should replace `_site` with `www`

Can you replace `pkg.homepage` with `typespecimens.xyz` ?
Or even the full `https:// typespecimens.xyz /` (without the spaces)

Unfortunately, Cloudinary can't fetch the image from your localhost, so you'll have to deploy it to see the real result.

BTW, `pkg.homepage` comes from this: https://github.com/nhoizey/nicolas-hoizey.com/blob/master/package.json#L12

I will change it to use an entry in a data file instead.

I run transforms on production build only, so local dev builds are faster AND images are visible with basic HTML:
https://github.com/nhoizey/nicolas-hoizey.com/blob/master/.eleventy.js#L154-L161

