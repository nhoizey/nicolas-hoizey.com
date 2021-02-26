---
date: 2021-02-25 23:08:34 +02:00
title: "Accessible anchor links with Markdown-it and Eleventy"
lang:  en
tags:  [accessibility, Eleventy]
---

::: lead
I like to be able to link directly to a section in a long content. I wish every site provided anchor links associated to headings, even if [Text Fragments](https://web.dev/text-fragments/) might be a cross browser thing sometimes in the future. Here's how I made the anchor links of my [Eleventy](https://11ty.dev/) based site accessible.
:::

I've been using the [markdown-it-anchors](https://github.com/valeriangalliat/markdown-it-anchor) plugin in my Eleventy configuration for a while, but even if I applied some settings different from the defaults (which heading levels to consider, how to generate a slug, which visual symbol to use, etc.), I never tried to change the rendering function, as I thought the default one was enough.

# Were my Anchor Links Accessible?

But a few weeks ago, I read this great detailed post where [Amber Wilson](https://amberwilson.co.uk/) explains how she figured out how to make such anchor links really accessible: [Are your Anchor Links Accessible?](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)

My anchor links were not accessible at all… 😱

# Enhancing `markdown-it-anchor`'s rendering

Amber also uses Eleventy and shared [a new plugin to automate such accessible anchor links](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/#automating-accessible-anchor-links), but I wanted to keep the features I'm already using in `markdown-it-anchor` and enhance it with better accessibility.

Fortunately, `markdown-it-anchor` provides [a large set of options](https://github.com/valeriangalliat/markdown-it-anchor#usage), including a way to provide our own rendering function with the `renderPermalink` option. After a while diving into `markdown-it` and `markdown-it-anchor` documentation and code, I've been able to create a rendering function that generates accessible anchor links, which you should be able to use in any Eleventy project! 🎉

The code is primarily based on [`markdown-it-anchor`'s default `renderPermalink` function](https://github.com/valeriangalliat/markdown-it-anchor/blob/85afd1f054032d6a3c83102329c413b56cad99a9/index.js#L13-L34).

Here is [my version](https://github.com/nhoizey/nicolas-hoizey.com/blob/4c9e42b306a387e9533a1036a6286b7f24091ed4/.eleventy.js#L111-L176):

```javascript
renderPermalink: (slug, opts, state, idx) => {
  // based on fifth version in
  // https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
  const linkContent = state.tokens[idx + 1].children[0].content;

  // Create the openning <div> for the wrapper
  const headingWrapperTokenOpen = Object.assign(
    new state.Token('div_open', 'div', 1),
    {
      attrs: [['class', 'heading-wrapper']],
    }
  );
  // Create the closing </div> for the wrapper
  const headingWrapperTokenClose = Object.assign(
    new state.Token('div_close', 'div', -1),
    {
      attrs: [['class', 'heading-wrapper']],
    }
  );

  // Create the tokens for the full accessible anchor link
  // <a class="deeplink" href="#your-own-platform-is-the-nearest-you-can-get-help-to-setup">
  //   <span aria-hidden="true">
  //     ${opts.permalinkSymbol}
  //   </span>
  //   <span class="visually-hidden">
  //     Section titled Your "own" platform is the nearest you can(get help to) setup
  //   </span>
  // </a >
  const anchorTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ...(opts.permalinkClass ? [['class', opts.permalinkClass]] : []),
        ['href', opts.permalinkHref(slug, state)],
        ...Object.entries(opts.permalinkAttrs(slug, state)),
      ],
    }),
    Object.assign(new state.Token('span_open', 'span', 1), {
      attrs: [['aria-hidden', 'true']],
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      content: opts.permalinkSymbol,
    }),
    Object.assign(new state.Token('span_close', 'span', -1), {}),
    Object.assign(new state.Token('span_open', 'span', 1), {
      attrs: [['class', 'visually-hidden']],
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      content: `Section titled ${linkContent}`,
    }),
    Object.assign(new state.Token('span_close', 'span', -1), {}),
    new state.Token('link_close', 'a', -1),
  ];

  // idx is the index of the heading's first token
  // insert the wrapper opening before the heading
  state.tokens.splice(idx, 0, headingWrapperTokenOpen);
  // insert the anchor link tokens after the wrapper opening and the 3 tokens of the heading
  state.tokens.splice(idx + 3 + 1, 0, ...anchorTokens);
  // insert the wrapper closing after all these
  state.tokens.splice(
    idx + 3 + 1 + anchorTokens.length,
    0,
    headingWrapperTokenClose
  );
},
```

I hope there are enough comments in the code to understand how it works. The main `markdown-it` behavior I had to understand is that [it uses an array of tokens to represent HTML nodes](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#token-stream), instead of a more traditional [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

# Adapting the CSS to the new HTML structure

If you're already using `markdown-it-anchor`, the anchor link is inside the heading:

```html
<h3 id="were-my-anchor-links-accessible">
  Were my Anchor Links Accessible?
  <a class="deeplink" href="#were-my-anchor-links-accessible">#</a>
</h3>
```

With my new code, following Amber advice, it is now:

```html
<div class="heading-wrapper">
  <h2 id="were-my-anchor-links-accessible">Were my Anchor Links Accessible?</h2>
  <a class="deeplink" href="#were-my-anchor-links-accessible">
    <span aria-hidden="true">#</span>
    <span class="visually-hidden">Section titled Were my Anchor Links Accessible?</span>
  </a>
</div>
```

My actual code is a little more complex as I use a SVG for the anchor symbol, but the HTML structure is the same, so you can take some inspiration from my CSS code, which is heavily inspired from Stephanie Eckles' [Smol Article Anchors](https://smolcss.dev/#smol-article-anchors):

```css
// Anchor links
// Based on https://smolcss.dev/#smol-article-anchors
.heading-wrapper {
  display: grid;
  // anchor link on the far right for long wrapping headings
  grid-template-columns: minmax(auto, max-content) min-content;
  align-items: stretch;
  gap: 0.5rem;
}

.deeplink {
  display: grid;
  justify-content: center;
  align-content: center;

  &:link,
  &:visited {
    padding: 0 0.25rem;
    border-radius: 0.3em;
    color: var(--color-meta);
    text-decoration: none;

    svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  .heading-wrapper:hover &,
  &:hover,
  &:focus {
    color: var(--color-link-hover);
    background-color: var(--color-link-hover-bg);
  }
}

@media (min-width: 65rem) {
  .heading-wrapper {
    // Anchor link in the left margin on larger viewports
    grid-template-columns: min-content auto;
    margin-left: -2rem; // 1rem width + .25rem * 2 paddings + 0.5rem gap
  }

  .deeplink {
    grid-row-start: 1;
  }
}
```

On viewports `< 65rem`, the anchor link is inside the content container, at the right of the heading. If a long heading wraps on multiple lines, the anchor link is located on the far right, but if the heading is short, the anchor link follows it directly. I'm not sure setting `grid-template-columns: minmax(auto, max-content) min-content;` is the best way to do it, feel free to suggest an enhancement.

On viewports `>= 65rem`, there is space around the content, so I move the anchor link in the margin on the left.

# Enhancing `markdown-it-anchor` for everyone

I asked [Valérian Galliat](https://www.codejam.info/val.html), maintainer of `markdown-it-anchor`, if he would be open to merge a pull request providing this enhancement: <https://github.com/valeriangalliat/markdown-it-anchor/issues/82>

But I think this would break (at least visually) all current uses of the plugin, so I believe it would require a new option to activate it. We'll discuss this before I provide the PR.
