---
date: 2023-01-07 14:49:09 +02:00
title: "Let's POSSE to Mastodon with a JSON Feed and a GitHub Action"
lang:  en
tags:  [IndieWeb, POSSE, Mastodon, JSON Feed, GitHub]
---

::: lead
After building a Node script [for my own POSSE needs]({% link_to "/notes/2022/11/26/1/" %}), I thought it would be good if other people could also use it. I knew not many people would be able to use the script as-is, so I built a GitHub Action that is much simpler to use, without losing any feature, even gaining some!
:::

You should already know that I'm a true believer of [IndieWeb](https://indieweb.org/) and [POSSE](https://indieweb.org/POSSE), as [many contents I already published](/archives/?query=indieweb) show.

You could for example replace "Medium" with many other services, including Twitter and Mastodon, in [Medium is only an edge server of your POSSE CDN, your own blog is the origin]({% link_to "medium-is-only-an-edge-server-of-your-posse-cdn-your-own-blog-is-the-origin" %}).

I also gave a talk (in French) about IndieWeb and POSSE 3 years ago: [Ne vous laissez plus déPOSSEder de vos contenus !]({% link_to "talks/2019/10/10/ne-vous-laissez-plus-deposseder-de-vos-contenus" %}){hreflang="fr"}.

::: info
Did you see Heydon Pickering's “Why The IndieWeb?” episode of the Webbed Briefs?
[You should!](https://briefs.video/videos/why-the-indieweb/)
:::

Every time I talk about IndieWeb and POSSE, a lot of people reply with “but it's not easy”… and they are right!

As [Max Böck recently said]({% link_to "the-indieweb-for-everyone" %}):

> Owning your content on the web should not require extensive technical knowledge or special skills. It should be just as easy as signing up for a cellphone plan.

So…

I've developed **a GitHub Action for anyone to POSSE their content to Mastodon as easily as possible**: [JSON Feed to Mastodon](https://github.com/marketplace/actions/json-feed-to-mastodon)

Yes, it uses a JSON Feed for input, so you might still have to build this one, if you "only" have a RSS or Atom feed. I hope to [support these also in the future](https://github.com/nhoizey/github-action-jsonfeed-to-mastodon/issues/16) as they're often available out of the box in content management tools/platforms (even on Mastodon), but there are multiple variants so it's not easy to deal with.

I know there are already other ways to push content from RSS/Atom feeds to Mastodon, but I didn't want to rely on a third party service like IFTTT or Zapier. Ok, GitHub is also a 3rd party, but my code and content are already there anyway[^node]. 🤷‍♂️

[^node]: and 99% of the Action is a Node script, so I can move anywhere else if necessary.

I won't paraphrase the Action's documentation, so go read it, use it, and tell me if it's useful:
[GitHub Action: JSON Feed to Mastodon](https://github.com/marketplace/actions/json-feed-to-mastodon)

If you have some ideas, bugs or anything to discuss about this action, [GitHub issues](https://github.com/nhoizey/github-action-jsonfeed-to-mastodon/issues) are the right place.

Also, I know my code is not state of the art, so feel free to open issues, or even better pull requests, if you think you help improve it.

HTH.
