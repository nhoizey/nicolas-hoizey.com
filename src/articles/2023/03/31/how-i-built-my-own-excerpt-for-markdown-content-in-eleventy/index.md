---
date: 2023-03-31 01:40:32 +02:00
title: "How I built my own excerpt for Markdown content in Eleventy"
lang:  en
tags:  [Eleventy, Markdown]
---

::: lead
I was not really happy with [Eleventy's native excerpt solution](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content) requiring just a separator and having the excerpt content preserved in the content, without any way to style it differently. So I tried different alternatives, and settled on a solution with some Markdown-it plugins and a bunch of regexes.
:::

To be able to style the content lead whatever it contains, I'm using the great and simple [`markdown-it-container`](https://github.com/GerHobbelt/markdown-it-container#readme) plugin for Markdown-it, with a `lead` container.

For exemple, I can write this in the begining of my Markdown file, after the YAML Front Matter:

```markdown
::: lead
This paragraph is in the lead.

This other paragraph is also in the lead.
:::

This is no more part of the content lead…
```

With this really simple syntax, I can put whatever I want in the lead and style it in the content page.

And I can also extract it for the excerpt!

I could have used a Nunjucks filter, as I previously did, but it means the excerpt for the same content would have been computed multiple times (unless I did some memoization) for different content listings in the homepage, a category page, archives pages, Atom and JSON feeds, Algolia index, etc.

Fortunately, Eleventy provides the `eleventyConfig.setFrontMatterParsingOptions()` function which allows passing options to [`gray-matter`](https://github.com/jonschlinkert/gray-matter#readme), the npm package it relies on to parse front matter.

This is the function that allows setting a custom separator for the default excerpt feature with the [`excerpt_separator`](https://github.com/jonschlinkert/gray-matter#optionsexcerpt_separator) option, [as shown in Eleventy documentation](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content), but in addition to the simple `true` boolean shown here, the `excerpt` option can be a function, which gets the Markdown content and options as parameters.

Here's the function I built to generate my own excerpt:

```javascript
{% raw %}
const markdownItPlainText = require('markdown-it-plain-text');
const excerptMd = new markdownIt().use(markdownItPlainText);

function grayMatterExcerpt(file, options) {
  const regex = /^.*::: lead(((?!(:::)).|\n)+):::.*$/gm;
  let excerpt = '';
  let leadFound = false;

  if ((leadMatches = regex.exec(file.content)) !== null) {
    lead = leadMatches[1];
    leadFound = true;
    excerptMd.render(lead);
  } else {
    excerptMd.render(file.content);
  }
  excerpt = excerptMd.plainText
    .trim()
    .replace(/{%(((?!(%})).|\n)+)%}/gm, '') // remove short codes
    .replace(/{{(((?!(}})).|\n)+)}}/gm, '') // remove nunjucks variables
    .replace(/{#(((?!(#})).|\n)+)#}/gm, '') // remove nunjucks comments
    .replace(/<style>(((?!(<\/style>)).|\n)+)<\/style>/gm, '') // remove inline CSS
    .replace(
      /<script type="application\/ld\+json">(((?!(<\/script>)).|\n)+)<\/script>/gm,
      ''
    ) // remove JSON+LD
    .replace(/(<\/h[1-6]>)/gm, '. $1') // add a dot at the end of headings
    .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gm, '') // remove HTML tags
    .replace(/(\[\^[^\]]+\])/gm, '') // remove Markdown footnotes
    .replace(/\[([^\]]+)\]\(\)/gm, '$1') // remove Markdown links without URL (from {% link_to %} for example)
    .replace(/ +(\.|,)/gm, '$1'); // remove space before punctuation

  if (!leadFound && excerpt.length > 150) {
    // Keep only 145 characters and an ellipsis if there was no declared lead
    excerpt = excerpt.replace(/^(.{145}[^\s]*).*/gm, '$1') + '…';
  }
  file.excerpt = excerpt;
}

eleventyConfig.setFrontMatterParsingOptions({
  excerpt: grayMatterExcerpt,
});
{% endraw %}
```

It first looks for a `::: lead` container to use directly, or takes the full content.

It then parses the result with Markdown-it and the [`markdown-it-plain-text`](https://github.com/wavesheep/markdown-it-plain-text#readme) plugin, and then removes some parts that are really not useful in an excerpt: Nunjucks short codes/variables/comments, inline CSS rules, JSON/LD metadata, remaining HTML tags, footnotes, etc.

Finally, if the full content was used (no `::: lead` found), it limits the result length.
