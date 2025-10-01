import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// 组件库构建：输出 ESM + CJS + 类型声明 + 单文件样式
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
      tsconfigPath: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'ChartConstructor',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'antd',
        '@ant-design/icons',
        'echarts',
        'ahooks',
      ],
      // 同时存在命名导出与默认导出时固定使用命名导出，避免 CJS 产物取值歧义
      output: {
        exports: 'named',
      },
    },
  },
});
