const path = require('path');

const srcRoot = path.join(__dirname, 'src');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 2,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [srcRoot],
        alias: {
          '@': srcRoot,
          '@a': path.join(srcRoot, 'assets'),
        },
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],

    // This must be after the decorators proposal.
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ],
};
