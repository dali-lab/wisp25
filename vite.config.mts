import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.dartmouth.edu',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
  base: '/',
  resolve: {
    // https://stackoverflow.com/a/73742188
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});