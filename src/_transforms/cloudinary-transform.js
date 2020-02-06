const deepmerge = require('deepmerge')
const fs = require('fs');
const imageSize = require('image-size');
const jsdom = require("@tbranyen/jsdom");
const markdownIt = require('markdown-it');

const md = new markdownIt();
const { JSDOM } = jsdom;
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const site = require("../_data/site.js");
const cloudinaryConfig = require("../_data/cloudinary-config.js");

module.exports = function (value, outputPath) {
  if (outputPath.endsWith(".html")) {
    // Default settings
    let globalSettings = {
      fallbackWidth: 640,
      minWidth: 320,
      maxWidth: 2560,
      steps: 5,
      sizes: '100vw',
      figure: 'auto',
      classes: [],
      attributes: {}
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
    const articleImages = [...document.querySelectorAll("main img")];
    if (articleImages.length) {

      // Get images src and dist path from attributes on body
      // TODO: move to context data
      let documentBody = document.querySelector('body');
      let srcPath = documentBody.getAttribute('data-img-src');
      let distPath = documentBody.getAttribute('data-img-dist');
      documentBody.removeAttribute('data-img-src');
      documentBody.removeAttribute('data-img-dist');

      articleImages.forEach(image => {
        let imageUrl = '';
        let imagePath = image.getAttribute('src');

        let imageSettings = globalSettings;

        image.classList.forEach(className => {
          if (cloudinaryConfig.presets[className] !== undefined) {
            // Overhide settings with a preset named in a class
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
              fs.promises.mkdir(distPath, { recursive: true }).then(() => {
                fs.copyFile(srcPath + imagePath, distPath + imagePath, (err) => {
                  if (err) throw err;
                });
              }).catch(err => {
                if (err) throw err;
              });
            }
            // TODO: get "dist/" from config
            imageUrl = site.url + outputPath.replace(/^dist\/(.*)index\.html/, "/$1") + imagePath;
          }
        }

        // Change the image source
        image.setAttribute('src', `${cloudinaryPrefix}q_auto,f_auto,w_${imageSettings.fallbackWidth}/${imageUrl}`);

        // generate the srcset attribute
        let srcset = [];
        for (let i = 0; i < imageSettings.steps; i++) {
          width = Math.ceil(imageSettings.minWidth + (imageSettings.maxWidth - imageSettings.minWidth) / (imageSettings.steps - 1) * i);
          if (imageSettings.attributes.width === undefined || width < imageSettings.attributes.width) {
            srcset.push(`${cloudinaryPrefix}q_auto,f_auto,w_${width}/${imageUrl} ${width}w`);
          } else {
            srcset.push(`${cloudinaryPrefix}q_auto,f_auto,w_${imageSettings.attributes.width}/${imageUrl} ${imageSettings.attributes.width}w`);
            break;
          }
        }
        image.setAttribute('srcset', srcset.join(', '));

        // add sizes attribute
        image.setAttribute('sizes', imageSettings.sizes);

        // Add attributes from the preset
        let attributesForFigure = {};
        if (Object.keys(imageSettings.attributes).length > 0) {
          for (const attribute in imageSettings.attributes) {
            if (imageSettings.attributes[attribute] !== undefined) {
              // Define immediately attributes than must be kept on img if there's a figure
              if (['width', 'height', 'loading'].indexOf(attribute) !== -1) {
                image.setAttribute(attribute, imageSettings.attributes[attribute]);
              } else {
                attributesForFigure[attribute] = imageSettings.attributes[attribute];
              }
            }
          }
        }

        // Replace the img with a figure if there is a caption (in the title)
        let caption = image.getAttribute('title');
        if (caption === null && imageSettings.figure === 'always') {
          caption = image.getAttribute('alt');
        }
        if ((caption && imageSettings.figure !== 'never') || imageSettings.figure === 'always') {
          const figure = document.createElement('figure');
          figure.classList.add(...image.classList);
          image.classList.remove(...image.classList);
          const figCaption = document.createElement('figcaption');
          figCaption.innerHTML = md.render(caption); // TODO: parse Markdown
          figure.appendChild(image.cloneNode(true));
          figure.appendChild(figCaption);
          image.replaceWith(figure);
        }

        // Add attributes that have to be on the root element, img or figure
        for (const attribute in attributesForFigure) {
          image.setAttribute(attribute, attributesForFigure[attribute]);
        }
      });
    }

    return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
  }
  return value;
};
