const path = require('path');

const DIST = '_site';

module.exports = {
  globDirectory: DIST,
  globPatterns: [
    './js/additional-es.*.js',
    './css/additional.*.css',
    './',
    './about/',
    './about/the-website.html',
    './offline.html',
    './offline-fallback.html',
    './manifest.webmanifest',
  ],
  swSrc: path.join(DIST, 'service-worker.js'),
  swDest: path.join(DIST, 'service-worker.js'),
  mode: 'production',
};
