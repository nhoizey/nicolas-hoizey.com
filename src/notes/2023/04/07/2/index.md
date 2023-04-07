---
date: 2023-04-07 19:17:26 +02:00
tags: [Eleventy]
---

Some things I wish people mentioned when writing about #Eleventy usage, moreover concerning assets bundling (Sass, JavaScript, etc.):

- Does it run only once per asset, or once per template where the asset is used?
- Does it run before or after HTML is generated?
- Does it manage hashes for cache busting?

This is really important for sites with many contents/pages, build speed, and site performance.