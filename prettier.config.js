export default {
  // 在语句末尾添加分号，有助于避免 JavaScript 在代码压缩和混淆时可能出现的语法问题
  semi: true,
  // 使用单引号表示字符串，这是 Airbnb 风格的特点，使代码更简洁、一致
  singleQuote: true,
  // 对于 ES5 及以上版本，在对象、数组等的最后一个元素后添加逗号（es5 autoconf）
  // 这样在添加、删除或移动元素时可减少 Git 版本控制中的差异，便于代码重构
  trailingComma: 'es5',
  // 指定代码的最大行宽，超过此宽度时 Prettier 会对代码换行，增强可读性，这里设为 120
  printWidth: 120,
  // 一个制表符（tab）等于的空格数，此处设为 2 个空格，有助于保持缩进一致性
  tabWidth: 2,
  // 不使用制表符进行缩进，而是使用空格，避免不同编辑器中制表符显示宽度不一致的问题
  useTabs: false,
  // 在 JSX 中，将结束标签（>）放在新的一行，使 JSX 代码结构更清晰
  jsxBracketSameLine: false,
  // 在箭头函数参数只有一个时，也添加括号，使代码风格更清晰、不易混淆
  arrowParens: 'always',
  // 在对象字面量的括号内，在属性和值之间添加空格，提高代码可读性
  bracketSpacing: true,
  // 指定文件的换行符为 LF（Line Feed，\n），这是 Unix/Linux 系统中的标准换行符，有助于保持跨平台一致性
  endOfLine: 'lf',
};
