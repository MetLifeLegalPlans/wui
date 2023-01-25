module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
  plugins: ['prettier'],
  rules: {
    // for loops should not be restricted
    'no-restricted-syntax': ['off'],
    // this is a NodeJS app
    'no-console': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: './src',
      },
    },
  },
};
