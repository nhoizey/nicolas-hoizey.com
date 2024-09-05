module.exports = {
  icon: (id, label) => `
<svg class="icon" role="img" aria-label="${label}" focusable="false">
  <use xlink:href="#symbol-${id}" />
</svg>
`,
  archiveIllustration: (src, width, height, alt) => {
    let image = `
<img
  alt='${alt}'
  width='${width}'
  height='${height}'
  src='https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_300,c_limit/${encodeURIComponent(
    src
  )}'
  srcset='`;
    image += [220, 465, 710, 955, 1200]
      .map(
        (resizeWidth) =>
          `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${resizeWidth},c_limit/${encodeURIComponent(
            src
          )} ${resizeWidth}w`
      )
      .join(',');
    image += `'
  sizes='
    (min-width: 67rem) 18rem,
    (min-width: 48rem) calc(0.4 * (90vw - 15rem)),
    (min-width: 40rem) 36vw,
    90vw'
  class='card__illustration'
  crossorigin='anonymous'
  loading='lazy' />
`;
    return image.replace(/\n/g, '\\n');
  },
};
