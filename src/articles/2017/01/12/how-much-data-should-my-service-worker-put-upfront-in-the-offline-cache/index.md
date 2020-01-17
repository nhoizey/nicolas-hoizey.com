---
title: How much data should my Service Worker put upfront in the offline cache?
date: 2017-01-12 12:00:00 +02:00
lang:  en
tags:  [offline, WebPerf, Service Worker, PWA]
promoted: true
---

![](/assets/logos/pwa.png "PWA"){.logo }

I love when Web site/apps work even when I'm offline. I've made my SVG game [esviji](http://play.esviji.com) work offline thanks to [appcache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) just after attending [Jake Archibald](https://twitter.com/jaffathecake) conference about why [Application Cache is a Douchebag](http://www.paris-web.fr/2012/conferences/application-cache.php) during the 2012 edition of the [Paris Web](http://www.paris-web.fr/) conference. Fortunately, we have now Service Workers (in some browsers), which gives us more control over this kind of cache for offline browsing. But as Uncle Ben says, “With Great Power Comes Great Responsibility”.

Just like with appcache, it is possible with Service Workers to put a full website in the cache when loading the first visited page.

**It is very interesting**, because you can then go offline and browse the whole site just as if you were online, without even noticing you're offline. The cache will then be updated when you visit pages of the site while online. Depending on the nature of the content, you will fetch the page from the server when it is requested by the user, so that she gets the up-to-date version[^browsercache], or you will show the cached version first, and update the cache only for subsequent visits.

[^browsercache]: Be careful, you can still get a not so up-to-date version if the page is taken from the traditional browser cache. Yes, "it's complicated" sometimes, as shown in [this awesome post written by Yoav Weiss](https://blog.yoav.ws/tale-of-four-caches/).

All of this is really well explained by [Jeremy Keith](https://twitter.com/adactio) in a series of posts on his blog, including the recent one about [Making Resilient Web Design work offline](https://adactio.com/journal/11730).

[Resilient Web Design](https://resilientwebdesign.com/) is a Web book Jeremy wrote a few weeks ago. I urge you to read this book, it's really great. Just like most of Jeremy's creations, anyway.

Here's an extract of the book's introduction:

> The World Wide Web has been around for long enough now that we can begin to evaluate the twists and turns of its evolution. I wrote this book to highlight some of the approaches to web design that have proven to be resilient. I didn’t do this purely out of historical interest (although I am fascinated by the already rich history of our young industry). In learning from the past, I believe we can better prepare for the future.

So, back to the topic of this post.

Jeremy had the great idea to make this book available offline thanks to [a Service Worker](https://resilientwebdesign.com/serviceworker.js), so you can visit it once, even only one page of it, and read the whole book while offline, commuting like me in Paris underground subway for example[^offlineios].

[^offlineios]: Well, that's pure fiction, because I have an iPhone, and Apple didn't work yet on supporting Service Workers in iOS. Just like [Scott Jehl](https://twitter.com/scottjehl), "[As an iOS user, the lack of Service Worker support in Safari is almost enough for me to switch to Android. Almost.](https://twitter.com/scottjehl/status/819263184750202884)".

**This is great**! There is a lot to come for the Web thanks to such features, assembled in [Progressive Web Apps](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)[^pwafr].

[^pwafr]: You can read more about Progressive Web Apps in french on my company's blog: [Les Progressive Web Apps pour booster l’UX de vos services](http://blog.clever-age.com/fr/2016/12/29/les-progressive-web-apps-pour-booster-ux/).

**But**, it means Jeremy chose to **fetch the whole site content and resources** in every [capable browser](http://caniuse.com/#feat=serviceworkers)[^capablebrowers], even if the user only wants to read the introduction, and decide that she doesn't need to read the rest. I would call her a fool, of course, but it might happen.

[^capablebrowers]: As of today, these include only Firefox, Chrome and Opera.

According to my browser network panel or [WebPagetest](https://www.webpagetest.org/result/170111_P9_D0V3/), it means **almost 16 Mb are downloaded** right away when you access one page of the site.

![](webpagetest-resilient-web-design.png "The Resilient Web Design web book audited by WebPagetest")

The site is very fast, and all checks are green, but that's because most of the downloads happen asynchronously, after the visited page has been rendered.

I must confess I did almost the same thing for a while in my game [esviji](http://play.esviji.com) when I started using appcache, because I put almost 2 Mb of audio files in the cache. I decided later that offline users could play without sound, so I removed it from the cache.

For a small site/app that takes 2 or 3 Mb, I can accept to download everything, because the convenience to have all this available while offline can be great. But I think 16 Mb is really to much.

Just to illustrate, it means that **one visit to this site will cost a Mauritanian at least 10 % of his daily income**, according to [Tim Kadlec](https://twitter.com/tkadlec)'s simulation on [What Does My Site Cost?](https://whatdoesmysitecost.com/test/170111_P9_D0V3#gniCost).

![](what-does-my-site-cost.png "Cost of visiting this website as a percentage of daily income")

Only 0.24 % for Jeremy in UK or 0.28 % for me in France, but we are here because we love the [World Wide Web, not Wealthy Westerners' Web](https://www.paris-web.fr/2016/conferences/www-world-wide-web-not-wealthy-westerners-web.php), as presented by [Bruce Lawson](https://twitter.com/brucel) during 2016 edition of the Paris Web conference.

![](/assets/logos/lighthouse.png){.logo}

Because I use it quite a lot these days to check my own Progressive Web Apps, I thought it would be nice if [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk), the Chrome extension that check web pages against [a growing list of best practices](https://developers.google.com/web/updates/2016/12/lighthouse-dbw), included a check on total page weight. It looks like [Hubert Sablonnière](https://twitter.com/hsablonniere) already [had this idea and created an issue](https://github.com/GoogleChrome/lighthouse/issues/584), which got support from [Paul Irish](https://twitter.com/paul_irish), so it will come sooner or later.

For my own website, I first thought I would only cache visited pages. But I now cache the homepage, the two about pages, and the last post, regardless of the page on which the user arrives, for a really light total weight of 87 KB additional resources. The offline fallback page lists the pages that are in the cache, so that the user can discover some unknown content even when she's offline. This is a WIP, so it might break, and it will change over the coming weeks, because I might adjust my strategy.

*[WIP]: Work In Progress

There is a user setting to "save data" in some browser, which activation adds a new HTTP header we can test in our Service Workers, as shown by [Dean Hume](https://twitter.com/deanohume) in his post [Service Workers: Save your User's Data using the Save-Data Header](http://deanhume.com/home/blogpost/service-workers--save-your-users-data-using-the-save-data-header/10139), but I think most people that are not as tech savvy as us will never notice this setting, so it's obviously a nice to have, but it's not enough.

So, it might be nicer to initially cache only the files needed to enhance the performance of the site and provide a clean offline fallback, then add the pages when they are visited, and provide the user with an option to cache the whole site, or part of it, for future offline browsing.

**It would be less magical, indeed, but more respectful** of users with limited and/or costly data plans.

I don't know if Jeremy thought about this or not, but I hope there will be some discussions around this in the community, because Service Workers give us a lot of power, that could be abused by people not aware of the damages it can cause, or even on purpose, just because it helps making websites faster. When [the average page is already more than 2 Mb](https://www.soasta.com/blog/page-bloat-average-web-page-2-mb/), we really have to be careful.

To conclude, it's kind of amusing to see that Jeremy also provides links to download other versions of the book, including PDF, epub and mobi, and most of these files weight less than 16 Mb.

**February 25, 2017 update:** Lighthouse [will now give a lower score if total byte weight is too high](https://github.com/GoogleChrome/lighthouse/pull/1759).
