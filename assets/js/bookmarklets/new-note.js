// ==Bookmarklet==
// @name +note
// @description New note for nicolas-hoizey.com
// @version 1.0
// ==/Bookmarklet==

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
  - name: ""
    twitter: ""
    site: ""
tags: []
---
\n
${linkContent ? `> ${linkContent.replaceAll('\n', '\n> ')}` : ''}
`;

    /* **********************************************************************************
    /* Build the URL
    /* *********************************************************************************/
    const pathDate = dateString.slice(0, 10).replaceAll('-', '/');

    // TODO: find note ID for current day
    // Existing ones: https://api.github.com/repos/nhoizey/nicolas-hoizey.com/contents/src/notes/2022/09/02

    const filename = `src/links/${pathDate}/${slug}/index.md`;

    let issueUrl = `https://github.com/nhoizey/nicolas-hoizey.com/new/main/?filename=${filename}&value=${encodeURIComponent(
      value
    )}`;

    window.open(issueUrl);
  }
}
