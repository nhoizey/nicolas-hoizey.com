---
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

