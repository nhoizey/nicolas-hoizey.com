module.exports = {
  caniuse: (feature) => {
    return `<figure><img src="https://caniuse.bitsofco.de/image/${feature}.png" alt="Browser support for feature “${feature}“" width="800" /><figcaption><a href="https://caniuse.com/#feat=${feature}">Can I Use ${feature}?</a></figcaption></figure>`;
  },
};
