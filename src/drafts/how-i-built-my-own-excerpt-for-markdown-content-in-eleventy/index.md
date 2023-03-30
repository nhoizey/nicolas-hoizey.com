---
title: "How I built my own excerpt for Markdown content in Eleventy"
lang:  en
tags:  [Eleventy, Markdown]
---

::: lead
I was not really happy with [Eleventy's native excerpt solution](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content) requiring just a separator and having the excerpt content preserved in the content, without any way to style it differently. So I tried different alternatives, and settled on a solution with some Markdown-it plugins and a bunch of regexes.
:::


