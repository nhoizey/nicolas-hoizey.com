---
date: 2022-01-26 12:49:33 +00:00
title: "Trailing Slashes on URLs: Contentious or Settled?"
lang: en
link: https://www.zachleat.com/web/trailing-slash/
authors:
  - "Zach Leatherman"
tags: [Eleventy, URL, Netlify, Cloudflare]
---

I have mixed feelings about URLs without an extension (`.html` for example) or a trailing slash. It certainly comes mostly from 25 years of unexpected behaviors with HTTP servers and other Web plumbering.

When there's none of these at the end of the URL, I don't know what it "is", it's disturbing.

I like how URL termination helps infer what the page type is:
- There's a trailing slash? It's a folder, there are other contents "inside"/"below" it.
- There's an `.html` extension? It's a page, a "leaf" in the site content "tree".

I disagree with Zach on the "Cool URIs Don’t Change" impact on extensions in URLs. Do we really think Web pages will use anything else than HTML in the future? I would agree for other extensions though, even if [a good redictions strategy can help]({% link_to "identify-which-apache-rewrite-rules-are-used" %}).

But on the server side, if I have an article with some illustrations or other content attached (CSS for [this example]({% link_to "jamstack-is-fast-only-if-you-make-it-so" %})), I like to keep these in a single place, which is naturaly a folder, and URLs to load/show these other contents should be relative to the main content one. I wan't to avoid the "Asset References" problem Zach lists in his article. Which leads to URLs with trailing slashes as the best URLs for contents, instead of an `.html` extension, as my guts would promote. Struggling with myself…

So be it, content URLs as folders, and so trailing slashes everywhere… 🤷‍♂️

I like then that an `index.html` file shows the content of a folder by convention[^opquast204].

[^opquast204]: Remember that [you should never let the web server list the actual files present in the folder on the file system](https://checklists.opquast.com/en/web-quality-assurance/the-server-does-not-list-files-in-folders-that-do-not-have-index-files)![^opquast]

[^opquast]: By the way, make sure you read, understand and apply as much as possible Opquast's [Web Quality Assurance Checklist](https://checklists.opquast.com/en/web-quality-assurance/).

Now that this is settled, it's important to know how our toolschain helps or prevent it, as Zach shows with the help of Sebastien Lorber's [huge work](https://github.com/slorber/trailing-slash-guide) on the topic.

From the tools I use nowadays for multiple sites:
- [Eleventy](https://11ty.dev) helps, as it is the default behavior[^eleventy], and you can define your own permalinks behavior if you want. 👍
- [Netlify](https://netlify.com) has an optional "Pretty URLs" (which means "without extension") feature in [post build asset optimizations](https://docs.netlify.com/site-deploys/post-processing/), I really thank them for making it optional, even if it's unfortunately active by default. 👍
- [Cloudflare](https://cloudflare.com) on the other hand does it [by default without any way to disable it](https://developers.cloudflare.com/pages/platform/serving-pages#route-matching). I don't like that, even if I currently use trailing slashes anyway. 😡

[^eleventy]: It comes though with an issue: if you create source files `/folder.md` and `folder/index.md`, they get the same permalink, which should be impossible. That's something you can [change with a single option in Pack11ty](https://pack11ty.dev/documentation/collections/#permalinks), my Eleventy project template.
