const path = require('path');

const srcRoot = path.join(__dirname, 'src');

module.exports = {
  parser: 'babel-eslint',

  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier'],

  env: {
    browser: true,
  },

  rules: {
    // We don't want `console` calls in our code because they are generally
    //   used for debugging.
    'no-console': 'error',

    // This rule makes string interpolation difficult because it makes you
    //   need explicit whitespace expressions.
    'react/jsx-one-expression-per-line': 'off',

    // Generally, we want to make sure prop types are used in our components,
    //   but since we use the stores everywhere, it just ends up adding a lot
    //   of boilerplate, so we skip it for the stores only.
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'theme', 'selected'],
      },
    ],

    // We want to keep spacing consistent even for the children, which is not
    //   enabled by default, but should be.
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
        allowMultiline: true,
      },
    ],

    // This makes no actual sense
    'react/jsx-props-no-spreading': 'off',

    // We just flat disagree with these
    'react/static-property-placement': 'off',
    'prefer-object-spread': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-fragments': 'off',

    'jsx-a11y/control-has-associated-label': 'off',
  },

  settings: {
    'import/resolver': {
      'babel-module': {
        root: [srcRoot],
        alias: {
          '@': srcRoot,
          '@a': path.join(srcRoot, 'assets'),
        },
      },
    },
  },
};
