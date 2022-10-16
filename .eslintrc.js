module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-shadow': 'warn',
    'no-unused-vars': 'off',
    radix: 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // For optional chaining to not create linting errors
    'no-unused-expressions': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/newline-after-import': 'warn',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    'react/jsx-curly-newline': 'off',
    'react/jsx-tag-spacing': 'warn',
    'react/button-has-type': 'warn',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-one-expression-per-line': 'off',
  },
};
