---
date: 2023-02-08 11:42:51 +02:00
title: "A bookmarklet to create a new link content Markdown on GitHub"
lang:  en
tags:  [Markdown, Eleventy, bookmarklet]
---

::: lead
When I was building my site on my local computer, I had a shell script to initialize a new Markdown file for sharing a [link](/links/). When I [moved to Cloudflare Pages 6 months ago]({% link_to "notes/2022/07/29/1/" %}), it opened a new opportunity to share links more easily in my Eleventy content, directly from the page I wanted to share. Bookmarklets are still an awesome invention!
:::

The main features of my bookmarklet are:
- get the page title, ask for any change in a `window.prompt()`
- get some content
  - the selection made on current page,
  - or the page's meta description,
  - or the first paragraph of the first `main` element,
  - or the first paragraph of the first `article` element,
  - or the first paragraph of the page
- compute the slug based on the title
- compute the file path for my links content type (`/links/YYYY/MM/DD/slug/index.md`)
- create the Markdown file content, with YAML Front Matter
- open a new file editor on GitHub, so I can add some content and metadata

I can then commit the file, push it directly to my `main` branch or open a pull request.

And then the build runs on Cloudflare Pages, and the new link is online. It is also available in the feeds, to it soon becomes a toot on Mastodon, thanks to [my GitHub Action]({% link_to "let-s-posse-to-mastodon-with-a-feed-and-a-github-action" %})!

The JavaScript source code [is here on GitHub](https://github.com/nhoizey/nicolas-hoizey.com/blob/main/assets/js/bookmarklets/new-link.js):

```javascript
// ==Bookmarklet==
// @name +🔗
// @description New link for nicolas-hoizey.com
// @version 1.0
// ==/Bookmarklet==

// Adapted from https://gist.github.com/codeguy/6684588#gistcomment-3361909
const slugify = (str) => {
  let slug = str.toString();
  console.log(`1: ${slug}`);
  slug = slug.replaceAll('/', ' ');
  console.log(`2: ${slug}`);
  slug = slug.normalize('NFD');
  console.log(`3: ${slug}`);
  slug = slug.replace(/[\u0300-\u036f]/g, '');
  console.log(`4: ${slug}`);
  slug = slug.toLowerCase();
  console.log(`5: ${slug}`);
  slug = slug.replace(/\s+/g, ' ');
  console.log(`6: ${slug}`);
  slug = slug.replace(/[^\w ]+/g, ' ');
  console.log(`7: ${slug}`);
  slug = slug.trim();
  console.log(`8: ${slug}`);
  slug = slug.replace(/ +/g, '-');
  console.log(`9: ${slug}`);

  return slug;
};

/* **********************************************************************************
/* Get data from the page
/* *********************************************************************************/
let pageTitle = window.document.title;
let linkSelection =
  'getSelection' in window ? window.getSelection().toString().trim() : '';
let linkContent =
  linkSelection ||
  window.document
    .querySelector('head meta[name=description i]')
    ?.content.trim() ||
  window.document.querySelector('main p')?.textContent.trim() ||
  window.document.querySelector('article p')?.textContent.trim() ||
  window.document.querySelector('p')?.textContent.trim();
let linkUrl = window.location.href;

/* **********************************************************************************
/* Ask the user to confirm/modify the title
/* *********************************************************************************/
let title = window.prompt('Title of the link?', pageTitle);

if (title !== null) {
  let slug = window.prompt('Slug of the link?', slugify(title));

  if (slug !== null) {
    /* **********************************************************************************
    /* Build the content
    /* *********************************************************************************/
    const today = new Date();
    const dateString = today
      .toISOString()
      .replace('T', ' ')
      .replace(/\.[0-9]{3}Z/, ' +00:00');

    let value = `---
date: ${dateString}
title: "${title}"
lang: en
link: ${linkUrl}
authors:
  - ""
tags: []
---
\n
${linkContent ? `> ${linkContent.replaceAll('\n', '\n> ')}` : ''}
`;

    /* **********************************************************************************
    /* Build the URL
    /* *********************************************************************************/
    const pathDate = dateString.slice(0, 10).replaceAll('-', '/');
    const filename = `src/links/${pathDate}/${slug}/index.md`;

    let newFileUrl = `https://github.com/nhoizey/nicolas-hoizey.com/new/main/?filename=${filename}&value=${encodeURIComponent(
      value
    )}`;

    window.open(newFileUrl);
  }
}
```

The metadata in the comment on top of this script is used by [bookmarklet](https://www.npmjs.com/package/bookmarklet), the npm package I use to transform my source JS into a proper bookmarklet, with [a page from which I can drag the link to my bookmarks bar](https://nicolas-hoizey.com/tools/bookmarklets/new-link):


``` shell
bookmarklet --demo assets/js/bookmarklets/new-link.js src/tools/bookmarklets/new-link.html
```

Good old bookmarklets are still great in 2023! 🥰
