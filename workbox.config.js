const path = require('path');

const BUILD_DIR = 'dist';

module.exports = {
  globDirectory: BUILD_DIR,
  globPatterns: [
    './js/*.js',
    './css/*.css',
    './assets/fonts/*.woff2',
    './',
    './about/',
    './about/the-website.html',
    './offline.html',
    './offline-fallback.html',
    './manifest.webmanifest'
  ],
  swSrc: path.join(BUILD_DIR, 'sw.js'),
  swDest: path.join(BUILD_DIR, 'sw.js'),
  mode: "production"
};
