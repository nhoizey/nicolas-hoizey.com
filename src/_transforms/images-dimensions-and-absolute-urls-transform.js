'use strict';

const basicHTML = require('basichtml');

module.exports = function(html, outputPath) {
  if (!outputPath.endsWith('.html')) {
    return html;
  }

  const { document } = basicHTML.init({
    selector: {
      // use the module sizzle, it will be required
      // automatically
      name: 'sizzle',
      // how to retrieve results => querySelectorAll
      $(Sizzle, element, css) {
        return Sizzle(css, element);
      },
    },
  });

  document.documentElement.innerHTML = html;

  // Get images src path from attribute on body
  // TODO: get source path from destination path?
  let documentBody = document.querySelector('body');
  let srcPath = documentBody.getAttribute('data-img-src');
  documentBody.removeAttribute('data-img-src');
  let distPath = outputPath.replace(/index\.html$/, '');

  const imageSize = require('image-size');
  const site = require('../_data/site.js');

  [...document.querySelectorAll('img:not([srcset])')].forEach(image => {
    let imageSrc = image.getAttribute('src');
    let imageUrl = '';

    if (imageSrc.match(/^(https?:)?\/\//)) {
      // TODO: find a way to get a remote image's dimensions
      imageUrl = imageSrc;
    } else {
      let imageDimensions;
      if (imageSrc[0] === '/') {
        // TODO: get "src/" from Eleventy config
        imageDimensions = imageSize('./src' + imageSrc);
        imageUrl = site.url + imageSrc;
      } else {
        // This is a relative URL
        imageDimensions = imageSize(srcPath + imageSrc);
        // TODO: get "dist/" from config
        imageUrl =
          site.url +
          outputPath.replace(/^dist\/(.*)index\.html/, '/$1') +
          imageSrc;
      }
      image.setAttribute('width', imageDimensions.width);
      image.setAttribute('height', imageDimensions.height);
      image.setAttribute('src', imageUrl);
    }

    image.dataset.responsiver = image.className;
  });

  return document.toString();
};
