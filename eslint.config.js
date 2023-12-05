const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    formatters: {
      css: true,
      html: true,
      toml: 'dprint',
      markdown: 'prettier',
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
    },
  },
  {
    ignores: [
      'src/scripts/vendor',
      'src/views/layouts/autotrader/css',
      'src/views/layouts/autotrader/js',
    ],
  },
)
