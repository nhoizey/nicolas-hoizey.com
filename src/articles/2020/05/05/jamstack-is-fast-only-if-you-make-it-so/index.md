---
date: 2020-05-05 12:13:01 +02:00
title: "JAMstack is fast only if you make it so"
lang:  en
tags:  [JAMstack, performance, API, Webmention]
promoted: true
---

::: lead
JAMstack often promotes itself as an excellent way to provide performant sites. It's even the first listed benefit on [jamstack.wtf](https://jamstack.wtf/), a "guide [which] gathers the concept of JAMstack in a straight-forward guide to encourage other developers to adopt the workflow". But too many JAMstack sites are very slow.
:::

::: info
Vous pouvez aussi lire la [version française](https://jamstatic.fr/2020/10/05/la-jamstack-n-est-rapide-que-si-vous-la-rendez-rapide/), merci [Arnaud](https://arnaudligny.fr/) pour la traduction.
{lang=fr}
:::

You may have seen [Alex Russell](https://infrequently.org/)'s frequent rants about Gatsby:

https://twitter.com/slightlylate/status/1184959830819106816

Gatsby is an easy target (among many others) because it is currently not optimized for performance out of the box, despite what's [promoted](https://store.gatsbyjs.org/product/gatsby-sticker-6-pack). It is possible to fix it, for example with [this plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-no-javascript/), and I believe good React developers can make it shine, but it should be the default, not an afterthought.

Eleventy is very different, as Zach Leatherman reminds us in [Eleventy’s New Performance Leaderboard](https://www.zachleat.com/web/performance-dashboard/):

> Eleventy doesn’t do any special optimizations out of the box to make your sites fast. It doesn’t protect you from making a slow site. But importantly **it also doesn’t add anything extra either**.

The issue with most slow JAMstack sites is that they load a loooot of JavaScript. Remember that any added JavaScript has to be sent to the browser, which also needs more computation for it. [It quickly impacts performance](https://v8.dev/blog/cost-of-javascript-2019).

Sometimes, using the server-side build is enough to get data from an API and serve HTML to all visitors, which is much better for performance.

For example, [swyx](https://www.swyx.io/) wrote [Clientside Webmentions](https://www.swyx.io/writing/clientside-webmentions/) about implementing Webmention with [Svelte](https://svelte.dev/). Any article promoting [Webmention](/tags/webmention/) and easing its adoption is welcome! But even if it's nice for a demo of Webmention and Svelte, I wouldn't recommend doing it client-side.

# Server-side first

I prefer [doing it on the server](https://nicolas-hoizey.com/articles/2017/07/27/so-long-disqus-hello-webmentions/#how-does-it-work-on-this-site).

It allows to:

- call webmention.io API only when building the site, which should be less often than visitors viewing pages.
- cache the result of requests to [webmention.io](https://webmention.io) and the timestamp of the latest, so that the next one only asks for new webmentions.

It puts less pressure on webmention.io, with one single request per build, when a client implementation makes a much larger request (or even several, with pagination) for **each** page view.

For example:

- my website received 75 webmentions in April 2020. I have probably built it a hundred times during the same period, so let's say **100 requests to webmention.io with small responses**.
- in the same period, my website had 3,746 page views (underestimated, I still use Google Analytics 🤷‍♂️), which would have made **3,746 requests to webmention.io with large responses**.

Using the server-side build to get the webmentions provides multiple benefits:

- The performance for the users is much better, with HTML already computed on the server and statically served.
- Much fewer API calls, requiring much less computing time and power.
- Everyone should know that [Aaron Parecki](https://aaronparecki.com/) provides the awesome webmention.io service **for free**, and most Webmention users seem to use it nowadays, so being nice with its API feels better.

# Enhance client-side, if really needed

If you know you receive a lot of very useful webmentions that you have to show to your visitors, you can enhance the server-side generated list with a bit of client-side.

But remember every JavaScript added to the page has a cost, so the few additional webmentions have to be really useful.

So, instead of doing this for every page view, at least:

First, try to **wait for some time after the site build** before making client-side API calls. Keep the build timestamp available to client-side JavaScript, and wait for an hour, a day, or more, depending on the frequency of webmentions. You could even use the page's "age" to query webmention.io less for older content that probably receives less webmentions, as [Aaron Gustafson did even for server-side call in his Jekyll plugin](https://aarongustafson.github.io/jekyll-webmention_io/performance-tuning).

Then, **keep track of a user's calls to the API**, in localStorage or IndexedDB, so that you don't make these calls again a short while after. You could even use a Service Worker to cache requests and their timestamp.[^serviceworker]

[^serviceworker]: [Bernard Nijenhuis](https://twitter.com/bnijenhuis/) wrote about [how he handles a Cache of webmention.io requests with a Service Worker](https://bnijenhuis.nl/notes/2021-07-07-implementing-service-workers-with-limited-cache/).

# Client-side only API calls sometimes make more sense

I agree Webmentions are not the most complex use case to explain that most of the time you should call APIs from the server at build time rather than from the client:

- Webmentions to show are the same for all visitors.
- Missing a few of the latest ones is probably not an issue.

So yes, many other use cases make client-side API calls necessary, or better than server-side ones, I understand that.

I say **it should not be the default**.

# Promoting the <del>AJMstack</del> Mstack

<link rel="stylesheet" href="./styles.css" />

That's also something I don't really like in current JAMstack trend, promoting **J**avaScript and **A**PIs much more than **M**arkup.

Here's for example what you can see on [jamstack.wtf](https://jamstack.wtf/) (simplified):

<dl class="stack stack-wtf">
  <dt class="stack__name">JAMstack
    <dd>
      <ol>
        <li class="stack__javascript">JavaScript</li>
        <li class="stack__apis">APIs</li>
        <li class="stack__markup">Markup</li>
      </ol>
    </dd>
  </dt>
</dl>

As suggested by [Yann](https://twitter.com/yann_yinn), I would like to start by using this better presentation[^grid]:

[^grid]: CSS Grid and Flexbox are so fun to use, it took me just a few minutes to get this, look at [this stylesheet](./styles.css)! 💪

<dl class="stack stack-jam">
  <dt class="stack__name">JAMstack
    <dd>
      <ol>
        <li class="stack__javascript">JavaScript</li>
        <li class="stack__apis">APIs</li>
        <li class="stack__markup">Markup</li>
      </ol>
    </dd>
  </dt>
</dl>

It makes more obvious there is a pile of things, quite useful for a "stack".

But I would like to suggest this modification:

<dl class="stack stack-ajm">
  <dt class="stack__name">AJMstack
    <dd>
      <ol>
        <li class="stack__apis">APIs</li>
        <li class="stack__javascript">JavaScript</li>
        <li class="stack__markup">Markup</li>
      </ol>
    </dd>
  </dt>
</dl>

Of course, it reads as **AJMstack** instead of JAMstack, so I bet I won't be successful promoting it… 🤷‍♂️

But at least it feels more accurate, it shows JavaScript is the link between APIs and Markup.

It even allows to present this as a great [progressive enhancement](/tags/progressive-enhancement/) platform, as we can start with plain old (did I hear "boring"?) Markup…

Here's the **Mstack**:

<dl class="stack stack-m">
  <dt class="stack__name">Mstack
    <dd>
      <ol>
        <li class="stack__markup">Markup</li>
      </ol>
    </dd>
  </dt>
</dl>

Make sure this "stack" is great, and then enhance with JavaScript and APIs.
