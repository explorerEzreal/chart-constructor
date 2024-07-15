module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  globals: {
    __DEV__: false,
    __dirname: false,
    window: true,
    define: true,
    history: true,
    location: true,
    wxjs: true,
    $: true,
    WeixinJSBridge: true,
    wx: true,
    process: true,
    qq: true,
  },
};
