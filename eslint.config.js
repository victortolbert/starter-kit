const antfu = require('@antfu/eslint-config').default

module.exports = antfu({

  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
  },

}, {
  ignores: [
    'public',
  ],
})
