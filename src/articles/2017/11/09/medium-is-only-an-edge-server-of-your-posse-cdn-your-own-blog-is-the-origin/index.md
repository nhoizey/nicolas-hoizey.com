---
title: Medium is only an edge server of your POSSE CDN, your own blog is the origin
date: 2017-11-09 12:00:00 +02:00
lang:  en
tags:  [Medium, blog, POSSE, IndieWeb]
promoted: true
---

People tend to be lazy (I am often) and chose the easiest tool to do the job, even if it's not the best one. [Medium](https://medium.com/) is the new [Blogger](https://www.blogger.com/)[^ev-williams], but with a [much nicer content editing UI](https://medium.com/@ev/writing-in-medium-df8eac9f4a5e), and a cleaner presentation of content to readers[^blur]. People can create and account and start publish in a few minutes, it's really easy. But how can all this be free?

[^ev-williams]: Ev Williams, the CEO of Medium, is one of Twitter's co-founders, but was previously headding Blogger.

[^blur]: I must say I really don't like the way they deal with images through, with this ugly blur.

# Medium can do anything with your content

![](/assets/logos/medium.png){.logo}

Andrea Phillips already said it a few years ago in her post [The Problem With Medium](https://medium.com/@andrhia/the-problem-with-medium-336300490cbb):

> you’re giving your writing to a corporation for free, and they can do anything they want with it. Forever. Without paying you. Ever.

The Terms of Service have evolved since Andrea's post back in 2013, but are still to be carefully considered (emphasis mine):

> By posting content to Medium, you give us a nonexclusive license to publish it on Medium Services, including **anything reasonably related to publishing it** (like storing, displaying, reformatting, and distributing it). In consideration for Medium granting you access to and use of the Services, **you agree that Medium may enable advertising on the Services**, including in connection with the display of your content or other information. **We may also use your content to promote Medium**, including its products and content. — [Content rights & responsibilities](https://medium.com/policy/medium-terms-of-service-9db0094a1e0f#8c81) section of current [Medium Terms of Service](https://medium.com/policy/medium-terms-of-service-9db0094a1e0f)

Of course, Medium is an obvious black sheep, but the same can be said about most other centralized and closed services.

# Bad things can happen

Additionally, Medium is a service that can disappear like many others before, and your content might be lost. I will never accept to take such a risk for my content.

Also, there are sometimes issues with content moderation, like [Peter O'Shaughnessy](https://twitter.com/poshaughnessy/) experienced a few days ago:

https://twitter.com/poshaughnessy/status/927836002915356672

Disappearing content can happen on any platform, like [it did on Twitter recently](https://gizmodo.com/search-for-bisexual-on-twitter-right-now-and-no-news-1820161061), but when you don't own the platform, you don't have any way to fix the issue, you can just wait for the platform owner to do it, if it pleases him.

# POSSE is the best option

POSSE means **P**ublish (on your) **O**wn **S**ite, **S**yndicate **E**lsewhere.

![](/assets/logos/indiewebcamp.png){.logo}

Like [Webmentions](/2017/07/so-long-disqus-hello-webmentions.html), POSSE is a creation of [IndieWeb](https://indieweb.org/), which gives this description:

> POSSE lets your friends keep using whatever they use to read your stuff (e.g. silo aggregators like Facebook, Tumblr, Twitter, etc.).
>
> It's a key part of why and how the IndieWeb movement is different from just "everyone blog on their own site", and also different from "everyone just install and run (YourFavoriteSocialSoftware)" etc. monoculture solutions.

You really own your content, on your own (cool) URLs, and it's up to you to [make it last](https://remysharp.com/2016/12/22/cool-uris-dont-change).

But you also syndicate it on other platform (most being centralized and closed) that might have greater reach. Ideally, copies of your content on these platforms should link to your canonical URLs. Even [Medium allows it](https://help.medium.com/hc/en-us/articles/217991468-SEO-and-duplicate-content).

IndieWeb listed [a few ways to POSSE to popular services and social networks](https://indieweb.org/POSSE#How_To_Implement).

This blog is already POSSEed on [Twitter](https://twitter.com/nhoizey) and [Facebook](https://www.facebook.com/nhoizey) thanks to [the Atom feed](https://nicolas-hoizey.com/atom.xml), [IFTTT](https://ifttt.com/) and [Buffer](https://buffer.com/).

# The Content Delivery Network

You can think of these other platforms as edge servers in a [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network).

The goal is to "distribute service spatially relative to end-users to provide high availability and high performance". The edge server that will serve an HTML page or static resource to a user is often the closest one. These edge servers get the content to serve from the origin server, operated by the content owner. The end-user might never contact the origin directly, but the most important is that she gets the pages and associated resources.

**Medium, Twitter, Facebook and others are edge services for your content**, they are the platforms where you will find — unfortunately — more readers that on your own URL.

**Your platform is the origin**.

# Let's make copies of our own content to Medium

You can [manually import any post onto Medium](https://help.medium.com/hc/en-us/articles/214550207-Import-post), just [like I did](https://medium.com/@nhoizey/chrome-fails-showing-big-emojis-8b274d98f17b) for my recent post about [big emojis not rendered by Chrome](/2017/10/chrome-fails-showing-big-emojis.html). But there are [very few formating options](https://help.medium.com/hc/en-us/sections/115001484747-Editing-formatting), it's really not made for such technical writings with code blocks.

There is also [an API](https://github.com/Medium/medium-api-docs) that allows you to `POST` you content to Medium. Jeremy Keith [blogged about this](https://adactio.com/journal/9694), and shared [his PHP code](https://gist.github.com/adactio/c174a4a68498e30babfd).

If like me you use Jekyll, Aaron Gustafson, author of [the plugin I use for Webmentions](/2017/07/so-long-disqus-hello-webmentions.html) has created another plugin for [Crossposting to Medium From Jekyll](https://www.aaron-gustafson.com/notebook/crossposting-to-medium-from-jekyll/), taking inspiration for Jeremy Keith's PHP code. I might try it soon.

# But setting your own platform is not so easy

I know it is not easy for most people to create and host their own platform, like [Nicolas told me on Twitter](https://twitter.com/nsteinmetz/status/928183482882428928):

https://twitter.com/nsteinmetz/status/928183482882428928

Remouk also added (in a since deleted Tweet) that the reach of our own platform is almost nonexistent, and that he has more comments on social shares than on the actual contents themselves.

I experience the same, that's why I'm really happy that [Webmentions, webmention.io and Bridgy](/2017/07/so-long-disqus-hello-webmentions.html) allow me to get Twitter comments back to my posts.

So, yes, it's obvious not everyone who wants to publish content is able to build and host his own platform. Even tech-savvy people can have difficulties doing so.

# Your "own" platform is the nearest you can (get help to) setup

If you can't do it right now, let's say hosting your own platform is your long term target.

You can start by choosing a better platform that Medium to create your content, the origin that will serve all edge platforms you want to have for their greater reach.

Such a platform can be Github with [Github Pages](https://pages.github.com/), where your content will more be yours than on Medium. You can also use the hosted [Wordpress.com](https://en.wordpress.com/). Or whatever where you will be confident enough you won't lose your content, and ownership of it.

But **first, chose your own domain name**, and use it for your canonical URLs. If you want later to change the platform, you can change where your domain points to, and your canonical URLs will be safe.

It's free on Github, and only costs 4€ a month on Wordpress.com.

It is one of the first items in [the IndieMark set of metrics](https://indieweb.org/IndieMark) for "measuring the indieweb-ness of a site, and a step-by-step approach to incrementally adopting indieweb features on your site".

It is really worth it.

I'm not alone recommending this:

https://twitter.com/nhoizey/status/932291964434898944

# January 15th, 2018 update

It looks like more people plan to POSSE everyday, great start for 2018!

Here is [Tim Kadlec](https://twitter.com/tkadlec/status/949340118489460739) planning to [own his own content](https://timkadlec.com/2018/01/owning-my-own-content/):

> it does mean writing more frequently here as well. It means treating my own site as the hub for the content I post elsewhere instead of letting it accumulate cobwebs.
