import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@patterns': path.resolve(__dirname, './src/projects/middle/design_patterns'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
  })