const fs = require('fs');
const jsdom = require("@tbranyen/jsdom");
const { JSDOM } = jsdom;
const deepmerge = require('deepmerge')
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
const site = require("../_data/site.js");
const cloudinaryConfig = require("../_data/cloudinary-config.js");

module.exports = function (value, outputPath) {
  if (outputPath.endsWith(".html") && outputPath.match(/^dist\/articles\/201/)) {
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

    // Overhide default settings with a "default" preset
    if (cloudinaryConfig.presets.default !== undefined) {
      globalSettings = deepmerge(
        globalSettings,
        cloudinaryConfig.presets.default,
        { arrayMerge: overwriteMerge }
      );
    }

    console.log('############### globalSettings ###############');
    console.dir(globalSettings);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

    const cloudinaryPrefix = `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/fetch/`;

    const DOM = new JSDOM(value, {
      resources: 'usable'
    });
    const document = DOM.window.document;
    const articleImages = [...document.querySelectorAll("main article img")];
    if (articleImages.length) {
      let article = document.querySelector('main article');
      let srcPath = article.getAttribute('data-img-src');
      let distPath = article.getAttribute('data-img-dist');

      articleImages.forEach(image => {
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

        console.log('############### imageSettings ###############');
        console.dir(imageSettings);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

        if (imageSettings.classes.length > 0) {
          image.classList.add(...imageSettings.classes);
        }

        let imageUrl = '';
        let imagePath = image.getAttribute('src');
        if (imagePath.match(/^https?:\/\//)) {
          imageUrl = imagePath;
        } else {
          // This is not an external URL
          if (imagePath[0] === '/') {
            // This is a local absolute URL
            imageUrl = site.url + imagePath;
          } else {
            // This is a relative URL
            fs.promises.mkdir(distPath, { recursive: true }).then(() => {
              fs.copyFile(srcPath + imagePath, distPath + imagePath, (err) => {
                if (err) throw err;
              });
            }).catch(err => {
              if (err) throw err;
            });
            imageUrl = site.url + outputPath.replace(/^dist\/(.*)index\.html/, "/$1") + imagePath;
          }
        }

        // Change the image source
        image.setAttribute('src', `${cloudinaryPrefix}q_auto,f_auto,w_${imageSettings.fallbackWidth}/${imageUrl}`);

        // generate the srcset attribute
        let srcset = [];
        for (let i = 0; i < imageSettings.steps; i++) {
          width = Math.ceil(imageSettings.minWidth + (imageSettings.maxWidth - imageSettings.minWidth) / (imageSettings.steps - 1) * i);
          srcset.push(`${cloudinaryPrefix}q_auto,f_auto,w_${width}/${imageUrl} ${width}w`);
        }
        image.setAttribute('srcset', srcset.join(', '));

        // add sizes attribute
        image.setAttribute('sizes', imageSettings.sizes);

        // Add attributes from the preset
        let attributesForFigure = {};
        if (imageSettings.attributes.length > 0) {
          for (const attribute in imageSettings.attributes) {
            // console.log(`${attribute}: ${imageSettings.attributes[attribute]}`);
            // Define immediately attributes than must be kept on img if there's a figure
            if (['width', 'height', 'loading'].indexOf(attribute)) {
              image.setAttribute(attribute, imageSettings.attributes[attribute]);
            } else {
              attributesForFigure[attribute] = imageSettings.attributes[attribute];
            }
          }
        }
        // console.dir(attributesForFigure);
        // Replace the img with a figure if there is a caption
        let caption = image.getAttribute('caption');
        if (caption === null && imageSettings.figure === 'always') {
          caption = image.getAttribute('alt');
        }
        if ((caption && imageSettings.figure !== 'never') || imageSettings.figure === 'always') {
          const figure = document.createElement('figure');
          figure.classList.add(...image.classList);
          image.classList.remove(...image.classList);
          const figCaption = document.createElement('figcaption');
          figCaption.innerHTML = caption; // TODO: parse Markdown
          image.removeAttribute('caption');
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
