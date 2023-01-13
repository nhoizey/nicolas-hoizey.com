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

    let issueUrl = `https://github.com/nhoizey/nicolas-hoizey.com/new/main/?filename=${filename}&value=${encodeURIComponent(
      value
    )}`;

    window.open(issueUrl);
  }
}
