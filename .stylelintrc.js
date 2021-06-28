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
      'rules',
      'at-rules',
    ],
    'order/properties-order': ['width', 'height'],
    'order/properties-alphabetical-order': null,
  },
};
