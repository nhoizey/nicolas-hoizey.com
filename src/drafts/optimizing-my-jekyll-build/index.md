---
title: Optimizing my Jekyll build
lang:  en
tags:  [Jekyll,performance]
---

With increasing content volume (519 posts to date), features (webmentions, Cloudinary responsive images, performance optimizations with Jekyll Assets, etc.) and templates complexity, my full Jekyll build type had gone mad, nearing 20 minutes!

# Profiling the build

You can add the `--profile` option to the build command and get this kind of statistics table[^table] at the end, ordered by decreasing time spent:

[^table]: I used the great [Markdown Tables Generator](http://www.tablesgenerator.com/markdown_tables) to clean it.

| Filename                         | Count |     Bytes |    Time |
| -------------------------------- | ----: | --------: | ------: |
| \_layouts/post.html              |   519 |  4415.60K | 847.704 |
| \_includes/webmentions.html      |   519 |   679.52K | 718.218 |
| \_includes/post-header.html      |   954 |  1474.69K | 226.384 |
| \_includes/post-abstract.html    |   433 |  3229.57K | 109.093 |
| \_layouts/tag.html               |   267 |  5802.45K |  90.434 |
| \_layouts/archives-month.html    |   148 |   693.46K |  38.616 |
| \_layouts/default.html           |   961 | 45662.45K |  22.785 |
| \_includes/head.html             |   961 | 14796.73K |  14.974 |
| \_layouts/microtypo.html         |   961 | 45686.41K |  10.935 |
| \_layouts/archives-year.html     |    17 |   709.63K |   7.453 |
| \_includes/social-image-url.html |   962 |   833.72K |   4.905 |
| \_includes/first-image-src.html  |  1394 |    97.53K |   3.073 |
| \_includes/poster.html           |   433 |   711.01K |   2.842 |
| \_layouts/atom-tag.xml           |   267 |  6036.85K |   2.109 |
| \_includes/comments.html         |   519 |  1353.80K |   1.659 |
| \_includes/foot.html             |   961 |  9231.79K |   1.348 |
| \_includes/mois.html             |  1071 |    37.11K |   1.296 |
| jekyll:assets                    | 14418 |   245.93K |   1.174 |
| indisponible.html                |     1 |     3.87K |   0.302 |
| index.html                       |     1 |    18.62K |   0.262 |
| offline.html                     |     1 |     3.80K |   0.146 |
| tags/index.html                  |     1 |    14.70K |   0.080 |
| social-images.html               |     1 |    50.80K |   0.050 |
| atom.xml                         |     1 |   168.25K |   0.027 |

I removed posts and pages that are generated only once to simplify the table with only the interesting parts.

It's pretty normal the `_layouts/post.html` template is the one taking the most time, and it's called only on time per post, so we can't do much about it.

But it includes sub-templates that 
