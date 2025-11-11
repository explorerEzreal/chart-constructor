# react-chart-constructor

基于 React 与 ECharts 的图表构造器组件。传入配置项 JSON 即可渲染图表，组件自带操作栏与右侧配置抽屉，抽屉顶部内嵌实时预览图；编辑只改草稿，点保存才提交并通过回调输出最新配置项，可直接写入数据库。

## 安装

```bash
pnpm add react-chart-constructor echarts antd react react-dom
```

`react`、`react-dom`、`echarts`、`antd` 为 peerDependencies，由使用方提供。

内置图表类型：`pie`（饼图）、`bar`（柱状图）、`line`（折线图）、`scatter`（散点图）、`combo`（折线柱状图），用 `createDefaultConfig(type)` 生成默认配置。

数据结构：饼图为 `{ list: [{ name, value }] }`；柱状图、折线图、折线柱状图共用 `{ categories, series: [{ name, data }] }`（折线柱状图的每个系列用 `type: 'bar' | 'line'` 指定渲染形态）；散点图为 `{ series: [{ name, data: [[x, y]] }] }`，X 轴按数值轴渲染。

## 使用

```tsx
import { CEchart } from 'react-chart-constructor';
import type { ChartConfig } from 'react-chart-constructor';
import 'react-chart-constructor/style.css';

const config: ChartConfig = {
  version: 1,
  type: 'pie',
  data: {
    seriesName: '访问来源',
    list: [
      { name: '搜索引擎', value: 1048 },
      { name: '直接访问', value: 735 },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '网站访问来源',
      subtext: '示例数据',
      left: 'center',
      textStyle: { color: '#333333', fontSize: 18, fontWeight: 'bolder' },
    },
    legend: { show: true, orient: 'vertical', left: 'left' },
    label: { show: true, position: 'outside', formatter: '{b}: {d}%' },
    tooltip: { show: true, formatter: '{b}: {c} ({d}%)' },
  },
};

export const Demo = () => (
  <div style={{ height: 420 }}>
    <CEchart
      value={config}
      height="100%"
      onChange={(next) => console.log('保存后的配置', next)}
      onSave={(next) => saveToDatabase(next)}
    />
  </div>
);
```

### 柱状图

```tsx
import { CEchart, createDefaultConfig } from 'react-chart-constructor';
import 'react-chart-constructor/style.css';

const config = createDefaultConfig('bar');

export const Demo = () => (
  <div style={{ height: 420 }}>
    <CEchart value={config} height="100%" onSave={(next) => saveToDatabase(next)} />
  </div>
);
```

柱状图数据为 `{ categories, series: [{ name, data }] }`，配置项额外包含 `xAxis`、`yAxis`、`series` 三个表单块。

### 枚举图表类型

```tsx
import { listChartMetas } from 'react-chart-constructor';

// 按内置注册顺序返回全部图表元数据，可直接渲染类型清单
const metas = listChartMetas().map((meta) => ({ type: meta.type, name: meta.name }));
```

### 自定义工具项

```tsx
import { CEchart } from 'react-chart-constructor';
import type { ToolItem } from 'react-chart-constructor';

// 清空 label 让按钮只显示图标，再用 tooltip 补回工具名称
const iconOnlyTools: ToolItem[] = [
  { key: 'downloadPng', label: '', tooltip: '下载图片' },
];
```

`ToolItem` 结构为 `{ key, label, icon?, tooltip?, onClick? }`，`tooltip` 为可选的悬停提示，仅在传入时展示。

### 全局主题

```tsx
import { registerTheme, setDefaultTheme } from 'react-chart-constructor';

// 注册并设为全局默认主题，未显式传 theme 的图表自动套用
registerTheme('business', businessOption);
setDefaultTheme('business');
// 清除全局默认，回落为 ECharts 默认外观
setDefaultTheme(undefined);
```

### 操作栏形态

`toolbarMode` 支持 `static`（默认，常驻图表上方）与 `float`（悬浮在图表右上角，鼠标悬停或键盘聚焦时淡入）。

## 导出内容

- 组件：`CEchart`（同时作为默认导出）
- 工具函数：`buildOption`、`createDefaultConfig`、`normalizeConfig`、`listChartMetas`、`getChartMeta`、`registerTheme`、`setDefaultTheme`、`getDefaultTheme`、`CONFIG_VERSION`
- 类型：`CEchartProps`、`ChartConfig`、`ChartConfigMap`、`ChartData`、`ChartDataItem`、`ChartType`、`ChartMeta`、`ChartTheme`、`ChartSettings`、`PieChartConfig`、`BarChartConfig`、`LineChartConfig`、`ScatterChartConfig`、`ComboChartConfig`、`ToolItem`、`ToolContext`、`ToolbarMode`、`SettingChangeEvent`、`SettingItemKey`

## 发布前检查

1. `pnpm build` 产出 `dist/index.js`、`dist/index.cjs`、`dist/index.d.ts`、`dist/style.css`
2. `pnpm typecheck` 与 `pnpm lint` 全量通过
3. 在 `apps/playground` 使用构建产物验证渲染、编辑、复制与导出
4. 执行 `pnpm changeset` 记录变更，再执行 `pnpm version-packages`
