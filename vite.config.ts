import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      // styl: {
      //   define: {
      //     $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
      //   },
      // },
    },
  },
  resolve: {
    // set alias
    alias: {
      '@': resolve(__dirname, 'src') + '/',
    },
  },
});
