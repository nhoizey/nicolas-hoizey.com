const path = require('node:path');

const DIST = '_site';

module.exports = {
  globDirectory: DIST,
  globPatterns: [
    './js/additional-es.*.js',
    './js/tagscloud-es.*.js',
    './css/additional.*.css',
    './manifest.webmanifest',
  ],
  dontCacheBustURLsMatching: new RegExp('.+.[a-f0-9]{8}..+'),
  swSrc: path.join(DIST, 'service-worker.js'),
  swDest: path.join(DIST, 'service-worker.js'),
};
