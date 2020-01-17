---
title: So long Disqus, hello Webmention
date: 2017-07-27 12:00:00 +02:00
lang:  en
tags:  [WebPerf, Webmention, IndieWeb]
tweet: https://twitter.com/nhoizey/status/890635589170585600
promoted: true
---

Enough. I'm fed up with Disqus. It's been useful, easy to plug on this blog, but it's a mess for web performance, and I don't own my data, so… bye bye. Webmention is now a great alternative, with more people implementing it, so let's try to keep only that.

# So long Disqus

When I launched this Jekyll based site a while ago, I didn't put any comment system, because I didn't like any of [the options available at the moment](https://nicolas-hoizey.com/2013/09/gerer-des-commentaires-sur-un-blog-statique.html){: hreflang="fr"}.

Later, I was missing the interaction I had on my previous dynamic blog powered by [SPIP](https://www.spip.net/en_rubrique25.html), so I jumped in the Disqus train, because it was the most used around me, and on the sites I visited.

## Disqus is so easy to use with Jekyll

Installing Disqus on a blog only requires [a few lines](https://gastero-prod.disqus.com/admin/universalcode/) in the post template, with two JavaScript variable to set with Liquid values. Really easy.

Then generate the site, deploy, and it works!

## But Disqus is a pain for actual and perceived web performance

I hate how Disqus feels so slow when I browse pages using it.

In fact, Disqus loads asynchronously, so it doesn't really affect the [Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) of the page on initial load and rendering, but I hate almost every use of lazy loading[^medium-lazy], and Disqus' one is really bad. I scroll the page to the post end, and then Disqus loads the comments and suggested content, pushing everything else, with an annoying repaint. I hate that. It makes me feel like the site is slow.

[^medium-lazy]: Don't get me started on [Medium's stupid images lazy loading](https://jmperezperez.com/medium-image-progressive-loading-placeholder/) which makes me see only blured useless things when I scroll…

Also, Disqus loads around 450 kB of data — mostly JavaScript — on the pages, which is not so light for "just" comments. And it loads that from 5 or 6 different domains[^dns], without a great caching optimization.

[^dns]: So as many DNS requests are needed.

![](dareboost-disqus-page-weight.png "[This page](/2015/06/la-recherche-dans-du-statique-facile-avec-algolia.html)'s weight before and after removing Disqus, as shown in my [Dareboost](https://www.dareboost.com/) monitoring. Disqus accounted for **three quarters** of the page weight!")

Disqus also requires [a few rules in your Content Security Policy](https://github.com/nico3333fr/CSP-useful/tree/master/csp-for-third-party-services#disqus), but that's manageable.

## Also, not everyone likes to comment on Disqus

Disqus being a third party service, we don't know what our comments become and how Disqus tracks us accross blogs, how [we are becoming the product](http://geek-and-poke.com/geekandpoke/2010/12/21/the-free-model.html).

![](geek-and-poke-fremium-model.jpg "The famous Geek&Poke cartoon with pigs talking about the “free” model."){.onehalf }

I can of course export all comments to keep my own local copy, but it's not as convenient as a true local storage.

Some people also [don't like being forced to create an account on Disqus to be able to comment](https://twitter.com/ChapitreOnze/status/890507297780367360){: hreflang="fr"}.

If you use Disqus on your blog, please activate the "Allow guests to comment" option in the settings!

![](disqus-guests.png "If you use Disqus, please allow guests to comment without an account")

# Comments history is not lost!

Of course, removing Disqus could have meant losing the comments made so far. But I don't like to lose valuable content. Some of the comments you make on my posts are even more valuable than the posts themselves!

So, I used [Pat Hawks](https://twitter.com/pathawks)'s [jekyll-disqus-comments](https://github.com/pathawks/jekyll-disqus-comments) plugin to get a copy of all comments into [YAML data files](https://github.com/nhoizey/nicolas-hoizey.com/tree/master/_comments).

I had to clean them a lot, mostly manually, because they were an HTML mess. Maybe not only because of Disqus, but also because they had already been [migrated from SPIP](/about/the-website.html#avec-jekyll-le-statique-cest-fantastique){: hreflang="fr"} before.

The comments are shown below posts has before[^comments], but they are now static, using [a Jekyll template](https://github.com/nhoizey/nicolas-hoizey.com/blob/master/_includes/comments.html), without Disqus being involved anymore.

[^comments]: Here is [an example of comments preserved for a popular post](https://nicolas-hoizey.com/2017/01/how-much-data-should-my-service-worker-put-upfront-in-the-offline-cache.html#commentaires).

# Hello Webmention

I added Webmention to this blog a while ago, with some success on popular posts like [How much data should my Service Worker put upfront in the offline cache?](https://nicolas-hoizey.com/2017/01/how-much-data-should-my-service-worker-put-upfront-in-the-offline-cache.html#webmentions).

I also see that Webmention use is growing elsewhere. For example, [Rachel Andrew](https://twitter.com/rachelandrew) chose to adopt Webmention because she had too much SPAM:

https://twitter.com/rachelandrew/status/882224351688482816

I discovered Webmention a while ago thanks to [Jeremy Keith](https://twitter.com/adactio)'s [experiments with Webmention](https://adactio.com/journal/6469) on his own blog.

## So, what is Webmention?

Webmention is [a W3C recommendation](https://www.w3.org/TR/webmention/) since January 12nd 2017, based on the great work of [IndieWeb](https://indieweb.org/) people.

[Drew McLellan](https://twitter.com/drewm), developer of the Perch CMS with Rachel Andrew, explains very well [the Webmention flow](https://allinthehead.com/retro/378/implementing-webmentions):

> 1. Frankie posts a blog entry.
> 1. Alex has thoughts in response, so also posts a blog entry linking to Frankie’s.
> 1. Alex’s publishing software finds the link and fetches Frankie’s post, finding the URL of Frankie’s Webmention endpoint in the document.
> 1. Alex’s software sends a notification to the endpoint.
> 1. Frankie’s software then fetches Alex’s post to verify that it really does link back, and then chooses how to display the reaction alongside Frankie’s post.

Reminds you of manual trackbacks and Wordpress' automated pingbacks? Indeed. Let say it's a standard way to do almost the same.

Trackbacks and pingbacks failed mostly because of SPAM, and IndieWeb is taking this seriously for Webmention's future, with intense work on [Vouch](https://indieweb.org/Vouch), an anti-spam extension to Webmention. Let's hope it gets implemented soon everywhere.

[James Richman](https://twitter.com/jamesrichmanx) explains in this post: [Is W3C Replicating the WordPress Pingback System?](https://wptavern.com/is-w3c-replicating-the-wordpress-pingback-system)

## How does it work on this site?

Webmentions for this site are collected by two services:

* [webmention.io](https://webmention.io/) "is a hosted service created to easily handle webmentions (and legacy pingbacks) on any web page". I use it as my Webmention endpoint. This is [an open source project](https://github.com/aaronpk/webmention.io) built by [Aaron Parecki](https://twitter.com/aaronpk), co-founder of [IndieWebCamp](https://indieweb.org/) and editor of the W3C Webmention and Micropub specifications[^shareaholic].
* [Bridgy](https://brid.gy/) "pulls comments, likes, and reshares on social networks" (Facebook, Twitter, Google+, Instagram, Flickr, etc.) and push them to my Webmention endpoint. This is [an open source project](https://github.com/snarfed/bridgy) built by IndieWeb people, and is free to use.

[^shareaholic]: Aaron is also a [shareaholic](http://www.urbandictionary.com/define.php?term=shareaholic), traking on his website [where he moves](https://aaronparecki.com/gps/), [what he eats](https://aaronparecki.com/ate), etc.

Once Webmentions are in webmention.io, they are pulled into my Jekyll sources thanks to [Aaron Gustafson](https://twitter.com/aarongustafson)'s [jekyll-webmention_io](https://github.com/aarongustafson/jekyll-webmention_io/) plugin for Jekyll, and added to my posts pages.

# There are still a few issues to fix

All of this is great, but there are a few issues I'ld like to fix as soon as possible.

First, there are some Webmentions that should not be shown, either because they are useless, or because they are duplicates. [webmention.io now provides a way to remove mentions](https://aaronparecki.com/2017/07/19/24/webmention-io), and will evolve to add [a block function](https://indieweb.org/block).

Also, I should group mentions by type. Likes, for example, could take much less space in the page. Aaron Gustafson grouped mentions by type [on his blog](https://www.aaron-gustafson.com/notebook/your-site-should-be-a-pwa/#webmentions), but I'ld like to show them as [facepiles](https://indieweb.org/facepile), [like Drew McLellan](https://allinthehead.com/retro/378/implementing-webmentions#comments):

![](webmention-facepiles.png "Nice facepiles for likes and reposts on Drew McLellan's site."){.onehalf }

I also have issues with some avatars that come directly from Twitter, and are [really heavy](https://github.com/aarongustafson/jekyll-webmention_io/issues/24). The new version of Aaron's Jekyll plugin will allow me to define my own template, and use Cloudinary to resize and optimize these images. I have yet to try it, because I'm still using the old single file version, while the new one is now a gem.

# August 11th, 2017 update

Simple —yet really valuable— Webmentions as likes and reposts are now simple facepiles. They are the most abundant Webmentions, so it helps reduce the length of the page, and make the actual mentions more visible, most being replies on Twitter.

Also, I'm now using my own templates for all these Webmentions, and I use Cloudinary to optimize all avatars (size, format and weight), and reduce the number of domains from where ressources for the page come. Also, default links to avatars that came from [webmention.io](https://webmention.io/) where in fact soft redirects (302) to the actual URL on Twitter's servers, so there was an additional latency to get them. Looks like I've killed two birds with one stone!

# January 15th, 2018 update

It looks like Webmentions is getting more traction every day (here [Tim Kadlec planning to replace Disqus with Webmentions](https://timkadlec.com/2018/01/owning-my-own-content/)), I hope 2018 will be a great year for them.
