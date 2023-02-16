const pkg = require('../../package.json');
const imageSize = require('image-size');
const markdownIt = require('markdown-it');
const md = new markdownIt();

const runBeforeHook = (image, document) => {
  let documentBody = document.querySelector('body');
  let srcPath = documentBody.getAttribute('data-img-src');
  // TODO: get "_site/" from config
  let distPath = documentBody
    .getAttribute('data-img-dist')
    .replace(/^_site/, '');

  let imageSrc = image.getAttribute('src');

  let imageUrl = '';

  if (imageSrc.match(/^(https?:)?\/\//)) {
    // TODO: find a way to get a remote image's dimensions
    // TODO: some images are local but have an absolute URL
    imageUrl = imageSrc;
  } else {
    if (!image.getAttribute('width') || !image.getAttribute('height')) {
      let imageDimensions;
      if (imageSrc[0] === '/') {
        imageDimensions = imageSize('./src/' + imageSrc);
      } else {
        // This is a relative URL
        imageDimensions = imageSize(srcPath + imageSrc);
      }
      image.setAttribute('width', imageDimensions.width);
      image.setAttribute('height', imageDimensions.height);
    }
    if (imageSrc[0] === '/') {
      imageUrl = pkg.homepage + imageSrc;
    } else {
      // This is a relative URL
      imageUrl = pkg.homepage + distPath + imageSrc;
    }
    image.setAttribute('src', imageUrl);
  }

  if ('responsiver' in image.dataset === false) {
    image.dataset.responsiver = image.className;
  }
};

const runAfterHook = (image, document) => {
  let imageUrl =
    image.getAttribute('data-pristine') || image.getAttribute('src');
  let caption = image.getAttribute('title');

  if (caption !== null) {
    caption = md.render(caption.trim());
  }

  let zoom = [...image.classList].indexOf('zoom') !== -1;

  if (caption || zoom) {
    const figure = document.createElement('figure');
    figure.classList.add(...image.classList);
    // TODO: decide weither classes should be removed from the image or not
    image.classList.remove(...image.classList);
    let figCaption = document.createElement('figcaption');
    figCaption.innerHTML =
      (caption ? caption : '') +
      (zoom
        ? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
        : '');
    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figCaption);

    image.replaceWith(figure);
  }
};

module.exports = {
  default: {
    selector: ':not(picture) img[src]:not([srcset]):not([src$=".svg"])',
    resizedImageUrl: (src, width) =>
      // https://cloudinary.com/blog/automatic_responsive_images_with_client_hints#comment-3190517665
      // `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width},c_limit/${src}`,
      `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_auto:100:${width},c_limit/${src}`,
    runBefore: runBeforeHook,
    runAfter: runAfterHook,
    fallbackWidth: 800,
    minWidth: 360,
    maxWidth: 1600,
    sizes: '(max-width: 66.7rem) 90vw, 60rem',
    attributes: {
      crossorigin: 'anonymous',
    },
  },
  twothirds: {
    fallbackWidth: 600,
    minWidth: 240,
    maxWidth: 1120,
    sizes: '(max-width: 20rem) 45vw, (max-width: 66.7rem) 60vw, 40rem',
    classes: ['twothirds'],
  },
  onehalf: {
    fallbackWidth: 400,
    minWidth: 180,
    maxWidth: 800,
    sizes: '(max-width: 66.7rem) 45vw, 30rem',
    classes: ['onehalf'],
  },
  onethird: {
    fallbackWidth: 300,
    minWidth: 120,
    maxWidth: 560,
    sizes: '(max-width: 20rem) 45vw, (max-width: 66.7rem) 30vw, 20rem',
    classes: ['onethird', 'right'],
  },
  photo_du_jour: {
    fallbackWidth: 300,
    minWidth: 120,
    maxWidth: 560,
    sizes: '(max-width: 20rem) 45vw, (max-width: 66.7rem) 30vw, 20rem',
    figure: 'always',
  },
  onefourth: {
    fallbackWidth: 200,
    minWidth: 100,
    maxWidth: 400,
    sizes:
      '(min-width: 66.7rem) 15rem, (min-width: 30rem) 22.5vw, (min-width: 20rem) 30vw, 45vw',
    classes: ['onefourth', 'right'],
  },
  avatar: {
    fallbackWidth: 32,
    minWidth: 32,
    maxWidth: 64,
    steps: 3,
    sizes: '32px',
  },
  reaction: {
    resizedImageUrl: (src, width) =>
      // https://cloudinary.com/blog/automatic_responsive_images_with_client_hints#comment-3190517665
      // `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width},c_limit/${src}`,
      `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width},c_limit/${src}`,
    fallbackWidth: 48,
    minWidth: 48,
    maxWidth: 96,
    steps: 3,
    sizes: '48px',
  },
  logo: {
    fallbackWidth: 240,
    minWidth: 150, // 320px * 45%
    maxWidth: 480, // 15rem * 16 * 2dppx
    sizes:
      '(min-width: 66.7rem) 15rem, (min-width: 30rem) 22.5vw, (min-width: 20rem) 30vw, 45vw',
    figure: 'never',
    classes: ['logo'],
  },
  portrait: {
    fallbackWidth: 240,
    minWidth: 150, // 320px * 45%
    maxWidth: 480, // 15rem * 16 * 2dppx
    sizes:
      '(min-width: 66.7rem) 14.4rem, (min-width: 30rem) calc(22.5vw - .6rem), (min-width: 20rem) calc(30vw - .6rem), calc(45vw - .6rem)',
    figure: 'never',
    classes: ['logo'],
  },
  small_logo: {
    fallbackWidth: 100,
    minWidth: 50,
    maxWidth: 200,
    sizes:
      '(max-width: 20rem) 22.5vw, (max-width: 30rem) 15vw, (max-width: 67rem) 11.25vw, 7.5rem',
    figure: 'never',
    classes: ['small_logo'],
  },
  page__illustration: {
    fallbackWidth: 300,
    minWidth: 220,
    maxWidth: 1200,
    sizes:
      '(min-width: 66.666rem) 20rem, (min-width: 40rem) 30vw, calc(90vw - 2em)',
  },
  card__illustration: {
    fallbackWidth: 384,
    minWidth: 220,
    maxWidth: 1100,
    sizes:
      '(min-width: 66.7rem) 23.4rem, (min-width: 30rem) calc(36vw - .6rem), calc(90vw - .6rem)',
  },
};
