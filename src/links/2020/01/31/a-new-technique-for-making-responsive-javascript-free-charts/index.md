---
date: 2020-01-31 22:45:25 +02:00
title: "A new technique for making responsive, JavaScript-free charts"
lang: en
link: https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp
authors:
  - name: "Rich Harris"
    twitter: "Rich_Harris"
tags: [SVG, Svelte]
---

I really like this clever use of a mix of SVG[^svg] and HTML/CSS to create responsive charts.

> Because we're using a percentage-based coordinate system, it's very easy to keep the HTML layer and the SVG layer glued together.

And that's great that this is easy to use thanks to the Svelte based [Pancake project](https://pancake-charts.surge.sh/), that can be used server-side to render static graphs, with JavaScript based motion and interactivity built as progressive enhancement.

[^svg]: You might already know I love [SVG](/tags/svg/)… 😁

