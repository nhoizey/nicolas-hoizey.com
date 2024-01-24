---
date: 2023-02-05 21:27:38 +02:00
title: "Updating webmentions on a static site"
lang:  en
tags:  [Webmention, Eleventy, static, GitHub, Cloudflare]
---

::: lead
When [I started using Webmention on this site]({% link_to "so-long-disqus-hello-webmentions" %}) (more than 5 years ago!), I was building the site on my local computer, and uploading the build result on my hosting with `rsync`. I've [moved to Cloudflare Pages 6 months ago]({% link_to "notes/2022/07/29/1/" %}), which means webmentions where updated only when I pushed new content to GitHub. Here's how I fixed that.
:::

I chose to fetch new webmentions directly on GitHub with an Action, so that new webmentions are immediately added to the repository, and future calls to the webmention.io API only ask for new mentions.

::: info
Most of my Webmention implementation is based on two great inspiration sources:
- [Max Böck](https://mxb.dev/)'s [Using Webmentions in Eleventy](https://mxb.dev/blog/using-webmentions-on-static-sites/)
- [Sia](https://sia.codes/)'s [An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/)
:::

Here's [the workflow of my GitHub Action](https://github.com/nhoizey/nicolas-hoizey.com/blob/main/.github/workflows/update-webmentions.yml):

```yaml
{% raw %}name: Check Webmentions
on:
  schedule:
    # Runs at every 15th minute from 0 through 59
    # https://crontab.guru/#0/15_*_*_*_*
    - cron: '0/15 * * * *'
  workflow_dispatch:

concurrency:
  group: ${{ github.workflow }}
  cancel-in-progress: true

jobs:
  webmentions:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the project
        uses: actions/checkout@v4

      - name: Select Node.js version
        uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Run webmention script
        env:
          WEBMENTION_IO_TOKEN: ${{ secrets.WEBMENTION_IO_TOKEN }}
        run: npm run webmention >> $GITHUB_STEP_SUMMARY

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v3
        with:
          token: ${{ secrets.PAT }}
          branch: webmentions
          delete-branch: true
          commit-message: Update Webmentions
          title: Update Webmentions
          labels: automerge 🤞
{% endraw %}
```

It uses the `WEBMENTION_IO_TOKEN` and `PAT` ([Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)) secrets I've defined in my GitHub secrets for Actions.

And here's [the Node.js script that it runs](https://github.com/nhoizey/nicolas-hoizey.com/blob/main/_scripts/update-webmention.js):

```javascript
const fetch = require('node-fetch');
const unionBy = require('lodash/unionBy');
const sanitizeHTML = require('sanitize-html');
const domain = new URL(require('../package.json').homepage).hostname;
const { writeToCache, readFromCache } = require('../src/_utils/cache');

// Load .env variables with dotenv
require('dotenv').config();

// Define Cache Location and API Endpoint
const WEBMENTION_URL = 'https://webmention.io/api';
const WEBMENTION_CACHE = '_cache/webmentions.json';
const WEBMENTION_TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !WEBMENTION_TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token');
    return false;
  }

  let url = `${WEBMENTION_URL}/mentions.jf2?domain=${domain}&token=${WEBMENTION_TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`; // only fetch new mentions

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const feed = await response.json();
  const webmentions = feed.children;
  let cleanedWebmentions = cleanWebmentions(webmentions);
  if (cleanedWebmentions.length === 0) {
    console.log('[Webmention] No new webmention');
    return null;
  } else {
    console.log(`[Webmention] ${cleanedWebmentions.length} new webmentions`);
    return cleanedWebmentions;
  }
}

function cleanWebmentions(webmentions) {
  // https://mxb.dev/blog/using-webmentions-on-static-sites/#h-parsing-and-filtering
  const sanitize = (entry) => {
    // Sanitize HTML content
    const { content } = entry;
    if (content && content['content-type'] === 'text/html') {
      let html = content.html;
      html = html
        .replace(/<a [^>]+><\/a>/gm, '')
        .trim()
        .replace(/\n/g, '<br />');
      html = sanitizeHTML(html, {
        allowedTags: [
          'b',
          'i',
          'em',
          'strong',
          'a',
          'blockquote',
          'ul',
          'ol',
          'li',
          'code',
          'pre',
          'br',
        ],
        allowedAttributes: {
          a: ['href', 'rel'],
          img: ['src', 'alt'],
        },
        allowedIframeHostnames: [],
      });
      content.html = html;
    }

    // Fix missing publication date
    if (!entry.published && entry['wm-received']) {
      entry.published = entry['wm-received'];
    }

    return entry;
  };

  return webmentions.map(sanitize);
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  if (b.length === 0) {
    return a;
  }
  let union = unionBy(a, b, 'wm-id');
  union.sort((a, b) => {
    let aDate = new Date(a.published || a['wm-received']);
    let bDate = new Date(b.published || b['wm-received']);
    return aDate - bDate;
  });
  return union;
}

const updateWebmention = async function () {
  const cached = readFromCache(WEBMENTION_CACHE) || {
    lastFetched: null,
    webmentions: [],
  };

  // Only fetch new mentions in production
  const fetchedAt = new Date().toISOString();
  const newWebmentions = await fetchWebmentions(cached.lastFetched);
  if (newWebmentions) {
    const webmentions = {
      lastFetched: fetchedAt,
      webmentions: mergeWebmentions(cached.webmentions, newWebmentions),
    };

    writeToCache(webmentions, WEBMENTION_CACHE);
  }
};

updateWebmention();
```

Whenever the workflow updates the repository with new webmentions, it triggers a Cloudflare Pages build (could be Netlify), and the site is updated.

It means I don't have to run a full build of the site periodically "just" to check if there are new webmentions, and the check can be more frequent, as it is really light and fast.
