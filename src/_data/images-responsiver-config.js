const markdownIt = require('markdown-it');
const md = new markdownIt();

const runBeforeHook = image => {};

const runAfterHook = image => {
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
  selector: ':not(picture) img:not([srcset]):not([src$=".svg"])',
  resizedImageUrl: (src, width) =>
    `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width}/${src}`,
  runBefore: runBeforeHook,
  runAfter: runAfterHook,
  presets: {
    default: {
      fallbackWidth: 800,
      minWidth: 360,
      maxWidth: 1600,
      sizes: '(max-width: 67rem) 90vw, 60rem',
      attributes: {
        loading: 'lazy',
      },
    },
    twothirds: {
      fallbackWidth: 600,
      minWidth: 240,
      maxWidth: 1120,
      sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 60vw, 40rem',
      classes: ['twothirds'],
    },
    onehalf: {
      fallbackWidth: 400,
      minWidth: 180,
      maxWidth: 800,
      sizes: '(max-width: 67rem) 45vw, 30rem',
      classes: ['onehalf'],
    },
    onethird: {
      fallbackWidth: 300,
      minWidth: 120,
      maxWidth: 560,
      sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
      classes: ['onethird', 'right'],
    },
    onefourth: {
      fallbackWidth: 200,
      minWidth: 100,
      maxWidth: 400,
      sizes:
        '(max-width: 20rem) 45vw, (max-width: 30rem) 30vw, (max-width: 67rem) 22.5vw, 15rem',
      classes: ['onefourth', 'right'],
    },
    vignette: {
      fallbackWidth: 300,
      minWidth: 120,
      maxWidth: 560,
      sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
    },
    smallavatar: {
      fallbackWidth: 24,
      minWidth: 24,
      maxWidth: 48,
      steps: 3,
      sizes: '24px',
    },
    largeavatar: {
      fallbackWidth: 48,
      minWidth: 48,
      maxWidth: 96,
      steps: 3,
      sizes: '48px',
    },
    screenshot: {
      fallbackWidth: 300,
      minWidth: 300,
      maxWidth: 900,
      sizes: '(min-width:60em) 21.6em, (min-width: 40em) 36vw, 100vw',
      figure: 'never',
    },
    logo: {
      fallbackWidth: 300,
      minWidth: 120,
      maxWidth: 560,
      sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
      figure: 'never',
      classes: ['logo'],
    },
  },
};
