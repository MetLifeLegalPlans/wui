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
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',

          '@mui/material': 'MUI',
          '@mui/icons-material': 'MuiIcons',
          '@mui/x-date-pickers': 'MuiXDatePickers',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',

          'react-hot-toast': 'ReactHotToast'
        }
      },

    }
  },
});
