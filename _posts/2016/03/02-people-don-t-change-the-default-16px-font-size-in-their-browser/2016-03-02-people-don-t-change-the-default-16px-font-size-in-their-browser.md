---
title: People don't change the default 16px font size in their browser
lang:  en
tags:  [em, accessibilité, préférence]
---

I am really happy to still read articles that advocate for the [use of proportional CSS units as `em` and `rem`](http://zellwk.com/blog/rem-vs-em/) in 2016. But there are often trolls that come comment these articles to say that we, who are using proportional units, are dumb, because there is no need for this. Here is [an example](http://zellwk.com/blog/rem-vs-em/#comment-2547145640).

There are unfortunately **two misleading urban legends** in most web developers minds:
 
## Default font size in browsers is always 16px

No, it's not.

It is often, right, but not always.

Here are a few counterexamples I've collected from actual devices / browsers:

| Device / browser                | Default font size |
|---------------------------------|------------------:|
| Opera Mini 4.5                  |              13px |
| Palm webOS 2.0 & webOS TouchPad |              14px |
| Opera Mini 7                    |              17px |
| AOL 9                           |              20px |
| Cybook Odyssey (e-book reader)  |              21px |
| Blackberry 6.0                  |              22px |
| NetFront NX                     |              23px |
| Kindle 3[^kindle]               |              26px |

[^kindle]: Yes, [people use Kindle and similar e-book readers to browser the Web](https://www.google.fr/search?q=kindle+web+font+size).

These default font sizes have been set by the device or browser vendors because it was the best size for reading. When you set your font-size in `px` units, you throw their work to satisfy their users/clients in the bin.

## People don't change the default font size in their browser

**I do** —and I have friends who also do— change the browser settings for default font size. I even made [a talk about this](https://speakerdeck.com/nhoizey/un-petit-pas-pour-lem-un-grand-pas-pour-le-web-paris-web-2013?slide=10)[^french] in 2013 at [the french leading Web conference](http://www.paris-web.fr/)!

[^french]: In french, sorry if you don't understand it.

<script async class="speakerdeck-embed" data-slide="10" data-id="e7c0142013ec01312783065ca157100a" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

I agree we are not a lot to do that, maybe even less than a few years ago.

But is it:

- because there is really no need anymore,
- because browsers hide this really valuable feature in their "advanced" settings,
- or because Web developers don't care about people who need this?

My humble opinion is that:

1. **there is still a need** for this, maybe even increasing with people using the Web getting older,
2. **but** too many websites are really deceptive, not caring at all about users preferences and needs, using `px` font-sizes, making this feature useless,
3. **then** users change their habits and use global zoom, even if it's more complicated and the result is sometimes less practical[^scroll],
4. **then** browsers hide or remove this feature, because they see in usage statistics that it is not used anymore,
5. **then** people who really would need this feature don't find it, don't even know it exists
6. **then** most web developers, who are also web users, don't know either that this feature exists, and that there are people out there who would be delighted to use it, so they don't do anything to support that

[^scroll]: Think about websites that are not yet responsive, where zooming leads to messy horizontal scroll.

So, we might not be a lot to need — or even just want — to change the default font size of our browsers, but:

- using `px` unit, you deny us this right
- using `em` unit, you satisfy everyone[^usersagainstem]

[^usersagainstem]: I never heard about users complaining about font sizes defined in `em`s, only developers.

So, if you use `px` for font-size, I hope it's only because you didn't know what it means, and I also hope you will change.

And please, please, don't tell me using `em`s or `rem`s is hard. It's not. At all. It just needs you to think different and use the appropriate tools. [Read this](http://zellwk.com/blog/rem-vs-em/) again, and practice.

