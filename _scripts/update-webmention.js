// https://sia.codes/posts/webmentions-eleventy-in-depth/

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

async function fetchUrlMappings() {
  let url = `https://nicolas-hoizey.com/tools/old-urls-mappings.json`;

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return await response.json();
}

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

async function rewriteUrls(webmentions) {
  const urlMappings = await fetchUrlMappings();

  const rewrittenWebmentions = webmentions.map((entry) => {
    // List properties where URLs could be rewritable
    const properties = ['wm-target'];
    properties.push(entry['wm-property']);

    // iterate over properties to rewrite URLs
    properties.forEach((property) => {
      // All URLs should be HTTPS
      entry[property] = entry[property].replace(/^http:/, 'https:');

      const newUrl = urlMappings[entry[property]];
      if (newUrl !== undefined) {
        entry[property] = newUrl;
      }
    });

    return entry;
  });

  return rewrittenWebmentions;
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
    const allWebmentions = mergeWebmentions(cached.webmentions, newWebmentions);
    const rewrittenWebmentions = await rewriteUrls(allWebmentions);

    writeToCache(
      {
        lastFetched: fetchedAt,
        webmentions: rewrittenWebmentions,
      },
      WEBMENTION_CACHE
    );
  }
};

updateWebmention();
