const { semanticOrdering } = require('stylelint-semantic-groups');

module.exports = {
  ignoreFiles: ['assets/sass/highlight/*.scss'],
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],
    'order/properties-order': semanticOrdering,
    'order/properties-alphabetical-order': null,
  },
};
