import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. 检测文件的格式
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  // 2. 定义不同环境的全局变量
  { languageOptions: { globals: globals.browser } },
  // 3. js 推荐 规则
  pluginJs.configs.recommended,
  // 4. ts 推荐 规则
  ...tseslint.configs.recommended,
  // 5. react 推荐 规则
  pluginReact.configs.flat.recommended,
  // 6、忽略检测
  {
    ignores: ['node_modules/*', 'dist/*', '*.css', '*.jpg', '*.jpeg', '*.png', '*.gif', '*.d.ts'],
  },
  // 7. 自定义规则
  {
    rules: {
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
  // 8、其他配置
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // 9. 将其放在最后一项，覆盖掉eslint的格式化规范
  eslintPluginPrettierRecommended,
];
