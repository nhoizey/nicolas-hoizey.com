'use strict';

const deepmerge = require('deepmerge');
const fs = require('fs');
const imageSize = require('image-size');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const site = require('../_data/site.js');
const cloudinaryConfig = require('../_data/cloudinary-config.js');

module.exports = function(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    // Default settings
    let globalSettings = {
      fallbackWidth: 640,
      minWidth: 320,
      maxWidth: 2560,
      steps: 5,
      sizes: '100vw',
      classes: [],
      attributes: {},
    };

    if (cloudinaryConfig.copy_files === undefined) {
      cloudinaryConfig.copy_files = false;
    }

    // Overhide default settings with a "default" preset
    if (cloudinaryConfig.presets.default !== undefined) {
      globalSettings = deepmerge(
        globalSettings,
        cloudinaryConfig.presets.default,
        { arrayMerge: overwriteMerge }
      );
    }

    const cloudinaryPrefix = `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/fetch/`;

    const DOM = new JSDOM(value);
    const document = DOM.window.document;
    const articleImages = [...document.querySelectorAll('main img')];
    if (articleImages.length) {
      // Get images src path from attribute on body
      // TODO: move to context data
      let documentBody = document.querySelector('body');
      let srcPath = documentBody.getAttribute('data-img-src');
      documentBody.removeAttribute('data-img-src');
      let distPath = outputPath.replace(/index\.html$/, '');

      articleImages.forEach(image => {
        let imageUrl = '';
        let imagePath = image.getAttribute('src');

        let imageSettings = globalSettings;

        // Overhide settings with presets named in classes
        image.classList.forEach(className => {
          if (cloudinaryConfig.presets[className] !== undefined) {
            imageSettings = deepmerge(
              imageSettings,
              cloudinaryConfig.presets[className],
              { arrayMerge: overwriteMerge }
            );
          }
        });

        imageSettings.attributes.width = undefined;
        imageSettings.attributes.height = undefined;

        if (imageSettings.classes.length > 0) {
          image.classList.add(...imageSettings.classes);
        }

        if (imagePath.match(/^(https?:)?\/\//)) {
          imageUrl = imagePath;
        } else {
          // This is not an external URL
          if (imagePath[0] === '/') {
            // This is a local absolute URL
            imageUrl = site.url + imagePath;

            // TODO: get "src/" from config
            const imageDimensions = imageSize('./src' + imagePath);
            imageSettings.attributes.width = imageDimensions.width;
            imageSettings.attributes.height = imageDimensions.height;
          } else {
            // This is a relative URL

            const imageDimensions = imageSize(srcPath + imagePath);
            imageSettings.attributes.width = imageDimensions.width;
            imageSettings.attributes.height = imageDimensions.height;

            if (cloudinaryConfig.copy_files) {
              // Copy the image file from src to dist
              fs.promises
                .mkdir(distPath, { recursive: true })
                .then(() => {
                  fs.copyFile(
                    srcPath + imagePath,
                    distPath + imagePath,
                    err => {
                      if (err) throw err;
                    }
                  );
                })
                .catch(err => {
                  if (err) throw err;
                });
            }
            // TODO: get "dist/" from config
            imageUrl =
              site.url +
              outputPath.replace(/^dist\/(.*)index\.html/, '/$1') +
              imagePath;
          }
        }

        // Change the image source
        image.setAttribute(
          'src',
          `${cloudinaryPrefix}q_auto,f_auto,w_${imageSettings.fallbackWidth}/${imageUrl}`
        );

        // generate the srcset attribute
        let srcset = [];
        for (let i = 0; i < imageSettings.steps; i++) {
          width = Math.ceil(
            imageSettings.minWidth +
              ((imageSettings.maxWidth - imageSettings.minWidth) /
                (imageSettings.steps - 1)) *
                i
          );
          if (
            imageSettings.attributes.width === undefined ||
            width < imageSettings.attributes.width
          ) {
            srcset.push(
              `${cloudinaryPrefix}q_auto,f_auto,w_${width}/${imageUrl} ${width}w`
            );
          } else {
            srcset.push(
              `${cloudinaryPrefix}q_auto,f_auto,w_${imageSettings.attributes.width}/${imageUrl} ${imageSettings.attributes.width}w`
            );
            break;
          }
        }
        image.setAttribute('srcset', srcset.join(', '));

        // add sizes attribute
        image.setAttribute('sizes', imageSettings.sizes);

        // add data-pristine attribute with URL to the pristine image
        image.setAttribute('data-pristine', imageUrl);

        // Add attributes from the preset
        if (Object.keys(imageSettings.attributes).length > 0) {
          for (const attribute in imageSettings.attributes) {
            if (imageSettings.attributes[attribute] !== undefined) {
              image.setAttribute(
                attribute,
                imageSettings.attributes[attribute]
              );
            }
          }
        }
      });
    }

    return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
  }
  return value;
};
