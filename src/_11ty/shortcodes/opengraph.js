const getShareImage = require('@jlengstorf/get-share-image').default;

module.exports = {
  ogImage: (title, tagline = '') => {
    return title
      ? getShareImage({
          cloudName: 'nho',
          imageWidth: 1200,
          imageHeight: 630,
          imagePublicID: 'resources/opengraph-background',
          textAreaWidth: 1100,
          textLeftOffset: 50,

          title: title,
          titleFont: 'Georgia',
          titleFontSize: 50 + Math.max(0, 50 - title.length),
          titleGravity: 'south_west',
          titleBottomOffset: 380,

          tagline: tagline,
          taglineFont: 'Georgia',
          taglineFontSize: 40,
          taglineGravity: 'north_east',
          taglineTopOffset: 300,
          taglineColor: '663399',
        })
      : '';
  },
};
