module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-8-point-grid',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'screen',
        ],
      },
    ],
    'declaration-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'first-nested',
          'inside-single-line-block',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'theme',
        ],
      },
    ],
    'number-leading-zero': null,
    'order/properties-alphabetical-order': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
        ],
      },
    ],
    'scss/comment-no-empty': null,
    // 'selector-class-pattern': [
    //   '^(slds|app)(-[a-z0-9_-]+|)$',
    //   {
    //     severity: 'error',
    //     resolveNestedSelectors: true,
    //   },
    // ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
}
