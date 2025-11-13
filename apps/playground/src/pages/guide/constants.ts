/** 安装命令：npm 为主，附 pnpm / yarn 变体 */
export const installCode = `# npm
npm install react-chart-constructor

# pnpm
pnpm add react-chart-constructor

# yarn
yarn add react-chart-constructor`;

/** 快速开始：引入组件、样式与容器尺寸即可渲染 */
export const quickStartCode = `import { CEchart, createDefaultConfig } from 'react-chart-constructor';
import type { ChartConfig } from 'react-chart-constructor';
import 'react-chart-constructor/style.css';

// 未传 value 时组件内置饼图默认配置
const config: ChartConfig = createDefaultConfig('bar');

export const Demo = () => (
  <div style={{ height: 420 }}>
    <CEchart
      value={config}
      height="100%"
      onChange={(next) => console.log('配置已更新', next)}
      onSave={(next) => saveToDatabase(next)}
    />
  </div>
);`;

/** 配置项结构：切换图表类型时生成对应默认配置 */
export const configCode = `import { createDefaultConfig } from 'react-chart-constructor';

const config = createDefaultConfig('line');`;

/** 自定义工具栏：同 key 覆盖内置项，新 key 追加 */
export const toolsCode = `import type { ToolItem } from 'react-chart-constructor';

const tools: ToolItem[] = [
  { key: 'edit', label: '编辑' },
  { key: 'downloadPng', label: '下载图片' },
  {
    key: 'printConfig',
    label: '打印配置',
    tooltip: '在控制台输出当前配置项',
    onClick: ({ config }) => console.log(config),
  },
];`;

/** 主题：注册自定义主题、设置全局默认与单图覆盖 */
export const themeCode = `import { CEchart, registerTheme, setDefaultTheme } from 'react-chart-constructor';

// 1. 注册自定义主题：需在图表初始化前调用
registerTheme('business', {
  color: ['#1677ff', '#52c41a', '#faad14'],
  backgroundColor: '#ffffff',
});

// 2. 全局默认主题：所有未显式传 theme 的图表自动套用
setDefaultTheme('business');

// 3. 单图覆盖：传入 theme 的图表忽略全局默认
<CEchart value={config} theme="dark" />;`;

export type PropRow = {
  key: string;
  prop: string;
  type: string;
  defaultValue: string;
  desc: string;
};

/** CEchartProps 全字段，与组件类型定义保持一致 */
export const propRows: PropRow[] = [
  {
    key: 'value',
    prop: 'value / defaultValue',
    type: 'ChartConfig',
    defaultValue: '-',
    desc: '初始配置项，未传入时使用内置饼图默认配置；defaultValue 为 value 的别名',
  },
  {
    key: 'onChange',
    prop: 'onChange',
    type: '(config: ChartConfig) => void',
    defaultValue: '-',
    desc: '点击保存后输出的配置项，草稿与已提交值一致时不触发',
  },
  {
    key: 'onSave',
    prop: 'onSave',
    type: '(config: ChartConfig) => void',
    defaultValue: '-',
    desc: '点击保存时输出的最新配置项，始终触发',
  },
  {
    key: 'showToolbar',
    prop: 'showToolbar',
    type: 'boolean',
    defaultValue: 'true',
    desc: '是否展示操作栏',
  },
  {
    key: 'toolbarMode',
    prop: 'toolbarMode',
    type: "'static' | 'float'",
    defaultValue: "'static'",
    desc: '操作栏展示形态：static 常驻在图表上方，float 悬浮在图表右上角并在悬停时淡入',
  },
  {
    key: 'tools',
    prop: 'tools',
    type: 'ToolItem[]',
    defaultValue: '-',
    desc: '自定义工具项，同 key 覆盖内置项，新 key 追加',
  },
  {
    key: 'editable',
    prop: 'editable',
    type: 'boolean',
    defaultValue: 'true',
    desc: '是否允许编辑',
  },
  {
    key: 'size',
    prop: 'width / height',
    type: 'number | string',
    defaultValue: "'100%'",
    desc: '容器尺寸',
  },
  {
    key: 'theme',
    prop: 'theme',
    type: 'ChartTheme',
    defaultValue: '-',
    desc: 'ECharts 主题名称或主题对象，未传入时使用全局默认主题',
  },
  {
    key: 'className',
    prop: 'className / style',
    type: 'string / CSSProperties',
    defaultValue: '-',
    desc: '容器样式扩展',
  },
  {
    key: 'onReady',
    prop: 'onReady',
    type: '(instance: ECharts) => void',
    defaultValue: '-',
    desc: '图表实例就绪回调',
  },
];

export type StructureRow = {
  key: string;
  type: string;
  data: string;
  series: string;
};

/** 内置图表类型及其 data、settings.series 结构 */
export const structureRows: StructureRow[] = [
  {
    key: 'pie',
    type: 'pie（饼图）',
    data: '{ seriesName, list: [{ name, value }] }',
    series: '-',
  },
  {
    key: 'bar',
    type: 'bar（柱状图）',
    data: '{ categories, series: [{ name, data }] }',
    series: 'barWidth、borderRadius、stack',
  },
  {
    key: 'line',
    type: 'line（折线图）',
    data: '{ categories, series: [{ name, data }] }',
    series: 'lineWidth、smooth、area、showSymbol、symbolSize',
  },
  {
    key: 'scatter',
    type: 'scatter（散点图）',
    data: '{ series: [{ name, data: [[x, y]] }] }（数值 x/y 轴）',
    series: 'symbolSize、symbol',
  },
  {
    key: 'combo',
    type: 'combo（折线柱状图）',
    data: "{ categories, series: [{ name, type: 'bar' | 'line', data }] }",
    series: '柱状与折线字段合并，共用单 Y 轴',
  },
];

/** 目录导航项：id 与页面各小节锚点一一对应 */
export const guideSections: { id: string; title: string }[] = [
  { id: 'install', title: '安装' },
  { id: 'quickstart', title: '快速开始' },
  { id: 'props', title: '组件 props' },
  { id: 'config', title: '配置项结构' },
  { id: 'toolbar', title: '自定义工具栏' },
  { id: 'theme', title: '主题' },
  { id: 'exports', title: '导出内容' },
];

/** 组件包对外导出内容，按用途分组 */
export const exportGroups: { label: string; items: string }[] = [
  {
    label: '组件',
    items: 'CEchart（同时作为默认导出）',
  },
  {
    label: '工具函数',
    items:
      'buildOption、createDefaultConfig、normalizeConfig、listChartMetas、getChartMeta、registerTheme、setDefaultTheme、getDefaultTheme',
  },
  {
    label: '类型',
    items:
      'CEchartProps、ChartConfig、ChartType、ChartTheme、ChartMeta、ToolItem、ToolbarMode、PieChartConfig、BarChartConfig、LineChartConfig、ScatterChartConfig、ComboChartConfig',
  },
];
