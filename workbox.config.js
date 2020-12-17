const path = require('path');

const DIST = '_site';

module.exports = {
  globDirectory: DIST,
  globPatterns: [
    './js/additional-es.*.js',
    './',
    './about/',
    './about/the-website.html',
    './offline.html',
    './offline-fallback.html',
    './manifest.webmanifest',
  ],
  dontCacheBustURLsMatching: new RegExp('.+.[a-f0-9]{8}..+'),
  swSrc: path.join(DIST, 'service-worker.js'),
  swDest: path.join(DIST, 'service-worker.js'),
};
