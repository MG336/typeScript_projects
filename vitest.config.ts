import { defineConfig } from 'vitest/config'
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Необходимо для манипуляции с DOM
    alias: {
        '@patterns': resolve(__dirname, './src/projects/middle/design_patterns'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
  },
  
})