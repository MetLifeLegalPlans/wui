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
        root: ['./src/'],
        alias: {
          '@': './src/',
          '@a': './src/assets/',
        },
      },
    ],
    [
      'import-static-files',
      {
        extensions: ['.png'],
        srcDir: './src/',
        outDir: './dist/',
      },
    ],
    'inline-react-svg',
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
