/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import * as packageJson from './package.json';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'wui',
      fileName: format => `wui.${format}.js`,
    },
    rollupOptions: {
      external: [
        '@emotion/react',
        '@emotion/styled',
        '@mui/icons-material',
        '@mui/material',
        '@mui/x-date-pickers',
        'react',
        'react-dom',
        'react-hot-toast',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
          '@mui/material': 'MaterialUI',
          '@mui/icons-material': 'MaterialUIIcons',
          '@mui/x-date-pickers': 'MaterialUIXDatePickers',
          'react-hot-toast': 'toast',
        },
      },
    },
  },
});
