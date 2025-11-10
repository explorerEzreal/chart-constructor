# chart-constructor

基于 React 与 ECharts 的图表构造器组件。传入配置项 JSON 即可渲染图表，组件自带操作栏与右侧配置抽屉，抽屉顶部内嵌实时预览图；编辑只改草稿，点保存才提交并通过回调输出最新配置项，可直接写入数据库。

## 安装

```bash
pnpm add chart-constructor echarts antd react react-dom
```

`react`、`react-dom`、`echarts`、`antd` 为 peerDependencies，由使用方提供。

内置图表类型：`pie`（饼图）、`bar`（柱状图），用 `createDefaultConfig(type)` 生成默认配置。

## 使用

```tsx
import { CEchart } from 'chart-constructor';
import type { ChartConfig } from 'chart-constructor';
import 'chart-constructor/style.css';

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
import { CEchart, createDefaultConfig } from 'chart-constructor';
import 'chart-constructor/style.css';

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
import { listChartMetas } from 'chart-constructor';

// 按内置注册顺序返回全部图表元数据，可直接渲染类型清单
const metas = listChartMetas().map((meta) => ({ type: meta.type, name: meta.name }));
```

### 自定义工具项

```tsx
import { CEchart } from 'chart-constructor';
import type { ToolItem } from 'chart-constructor';

// 清空 label 让按钮只显示图标，再用 tooltip 补回工具名称
const iconOnlyTools: ToolItem[] = [
  { key: 'downloadPng', label: '', tooltip: '下载图片' },
];
```

`ToolItem` 结构为 `{ key, label, icon?, tooltip?, onClick? }`，`tooltip` 为可选的悬停提示，仅在传入时展示。

## 导出内容

- 组件：`CEchart`（同时作为默认导出）
- 工具函数：`buildOption`、`createDefaultConfig`、`normalizeConfig`、`listChartMetas`、`getChartMeta`、`CONFIG_VERSION`
- 类型：`CEchartProps`、`ChartConfig`、`PieChartConfig`、`BarChartConfig`、`ChartData`、`PieChartData`、`BarChartData`、`ChartDataItem`、`BarChartSeries`、`ChartType`、`ChartMeta`、`ToolItem`、`ToolContext`、`SettingChangeEvent`、`SettingItemKey`

## 发布前检查

1. `pnpm build` 产出 `dist/index.js`、`dist/index.cjs`、`dist/index.d.ts`、`dist/style.css`
2. `pnpm typecheck` 与 `pnpm lint` 全量通过
3. 在 `apps/playground` 使用构建产物验证渲染、编辑、复制与导出
4. 执行 `pnpm changeset` 记录变更，再执行 `pnpm version-packages`
