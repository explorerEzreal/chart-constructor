import { fileURLToPath, URL } from 'node:url';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';

const appSrc = fileURLToPath(new URL('./src', import.meta.url));
const librarySrc = fileURLToPath(new URL('../../packages/chart-constructor/src', import.meta.url));

// 开发态直连组件库源码保证 HMR，生产构建走组件库 dist 产物
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^@\//, replacement: `${appSrc}/` },
      ...(mode === 'development'
        ? [
            {
              find: /^chart-constructor\/style\.css$/,
              replacement: `${librarySrc}/style/index.less`,
            },
            { find: /^chart-constructor$/, replacement: `${librarySrc}/index.ts` },
          ]
        : []),
    ],
  },
  server: {
    port: 5173,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
}));
