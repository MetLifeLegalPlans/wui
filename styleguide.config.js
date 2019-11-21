const path = require('path');

module.exports = {
  components: 'src/**/*.jsx',
  sections: [
    { name: 'Basics', components: 'src/basics/*.jsx', sectionDepth: 2 },
    { name: 'Input', components: 'src/input/*.jsx', sectionDepth: 2 },
    { name: 'Layout', components: 'src/layout/*.jsx', sectionDepth: 2 },
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  },
  getComponentPathLine: componentPath => componentPath.replace('src/', '@bequestinc/wui/'),
  usageMode: 'expand',
  pagePerSection: true,
};
