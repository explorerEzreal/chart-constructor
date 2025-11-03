# chart-constructor

基于 React 与 ECharts 的图表构造器组件库。传入一段配置项 JSON 即可渲染图表，组件自带操作栏与右侧配置抽屉：编辑时实时预览，保存时通过回调输出最新配置项，可直接写入数据库。

## 仓库结构

```
.
├── apps
│   └── playground                                # 本地调试站（首页 + 示例页）
├── packages
│   ├── chart-constructor                         # 唯一发布包
│   │   └── src
│   │       ├── components                        # CEchart / ChartView / Toolbar / EditDrawer
│   │       ├── metas                             # 图表类型元数据与 option 派生
│   │       ├── settings                          # 配置抽屉表单块
│   │       ├── utils                             # 配置读写、剪贴板、下载、导出动作
│   │       └── style                             # 组件样式（构建为 dist/style.css）
│   ├── eslint-config                             # 共享 ESLint 配置
│   └── tsconfig                                  # 共享 TypeScript 配置
└── turbo.json / pnpm-workspace.yaml / .changeset
```

## 技术栈

- 包管理：pnpm workspaces + turbo + changesets
- 构建：vite（应用）+ vite lib 模式（组件库，产出 ESM/CJS/类型/样式）
- 技术：React 18、TypeScript、ECharts 5、antd 5、ahooks、less

## 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动 playground（开发态直连组件库源码，支持 HMR）
pnpm build            # 构建组件库产物与 playground
pnpm typecheck        # 全量类型检查
pnpm lint             # 全量代码规范检查
pnpm clean            # 清理构建产物
pnpm changeset        # 记录变更
pnpm version-packages # 生成版本号与 CHANGELOG（当前阶段不发布）
```

## CEchart 用法

```tsx
import { CEchart } from 'chart-constructor';
import type { ChartConfig } from 'chart-constructor';
import 'chart-constructor/style.css';

export const Demo = () => (
  <div style={{ height: 420 }}>
    <CEchart
      value={config}
      height="100%"
      onChange={(next) => console.log('实时配置', next)}
      onSave={(next) => saveToDatabase(next)}
    />
  </div>
);
```

### 配置项结构

内置图表类型：`pie`（饼图）、`bar`（柱状图）。切换类型时用 `createDefaultConfig(type)` 生成对应默认配置。

```ts
type ChartConfig = PieChartConfig | BarChartConfig;

/** 各图表类型共用的标题、图例配置 */
type TitleSetting = {
  show: boolean;
  text: string;
  subtext: string;
  left: 'left' | 'center' | 'right';
  textStyle: {
    color: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter';
  };
};
type LegendSetting = {
  show: boolean;
  orient: 'horizontal' | 'vertical';
  left: 'left' | 'center' | 'right';
};

/** 饼图 */
type PieChartConfig = {
  version: 1;
  type: 'pie';
  data: {
    seriesName: string;
    list: Array<{ name: string; value: number }>;
  };
  settings: {
    title: TitleSetting;
    legend: LegendSetting;
    label: { show: boolean; position: 'outside' | 'inside'; formatter: string };
    tooltip: { show: boolean; formatter: string };
  };
};

/** 柱状图 */
type BarChartConfig = {
  version: 1;
  type: 'bar';
  data: {
    categories: string[];
    series: Array<{ name: string; data: number[] }>;
  };
  settings: {
    title: TitleSetting;
    legend: LegendSetting;
    label: { show: boolean; position: 'top' | 'inside' | 'insideTop'; formatter: string };
    tooltip: { show: boolean; trigger: 'item' | 'axis'; formatter: string };
    xAxis: { show: boolean; name: string; labelRotate: number };
    yAxis: { show: boolean; name: string; showSplitLine: boolean };
    series: { barWidth: number; borderRadius: number; stack: boolean };
  };
};
```

### 组件 props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `ChartConfig` | - | 初始配置项，未传入时使用内置饼图默认配置 |
| `defaultValue` | `ChartConfig` | - | 初始配置项（`value` 的别名） |
| `onChange` | `(config: ChartConfig) => void` | - | 编辑过程中实时输出的配置项 |
| `onSave` | `(config: ChartConfig) => void` | - | 点击保存时输出的最新配置项 |
| `showToolbar` | `boolean` | `true` | 是否展示操作栏 |
| `tools` | `ToolItem[]` | - | 自定义工具项，同 key 覆盖内置项，新 key 追加 |
| `editable` | `boolean` | `true` | 是否允许编辑 |
| `width` / `height` | `number \| string` | `'100%'` | 容器尺寸 |
| `theme` | `string \| object` | - | ECharts 主题 |
| `className` / `style` | - | - | 容器样式扩展 |
| `onReady` | `(instance: ECharts) => void` | - | 图表实例就绪回调 |

内置工具项：`edit`、`copyConfig`、`copyOption`、`downloadPng`、`screenshot`、`reset`。

自定义工具项结构为 `{ key, label, icon?, tooltip?, onClick? }`：`label` 为按钮文字，`tooltip` 为可选的悬停提示，仅在显式传入时展示，适合把工具栏做成纯图标按钮的场景。

### 导出内容

组件 `CEchart`（同时作为默认导出）、工具函数 `buildOption`、`createDefaultConfig`、`normalizeConfig`、`listChartMetas`、`getChartMeta`、`registerTheme`、`setDefaultTheme`、`getDefaultTheme`，以及 `CEchartProps`、`ChartConfig`、`PieChartConfig`、`BarChartConfig`、`ChartType`、`ChartTheme`、`ChartMeta`、`ToolItem` 等类型。

## 主题

主题复用 ECharts 原生机制，不进入 `ChartConfig`、不写入数据库。组件初始化时按 `theme` prop 优先、全局默认主题兜底的方式决定外观。

```tsx
import { CEchart, registerTheme, setDefaultTheme } from 'chart-constructor';

// 1. 注册自定义主题：需在图表初始化前调用
registerTheme('business', {
  color: ['#1677ff', '#52c41a', '#faad14'],
  backgroundColor: '#ffffff',
});

// 2. 全局默认主题：所有未显式传 theme 的图表自动套用
setDefaultTheme('business');
// 清除全局默认，回落为 ECharts 默认外观
setDefaultTheme(undefined);

// 3. 单图覆盖：传入 theme 的图表忽略全局默认
<CEchart value={config} theme="dark" />;
```

ECharts 5 自带 `dark` 主题可直接使用。运行期调用 `setDefaultTheme` 会同步重建未显式传 `theme` 的图表实例，显式传入 `theme` 的图表不受影响。

## 依赖约定

`react`、`react-dom`、`echarts`、`antd` 为 `chart-constructor` 的 peerDependencies，由使用方安装；`lodash`、`ahooks`、`@ant-design/icons` 为包内依赖。

## 发布前检查

1. `pnpm build` 产出 `packages/chart-constructor/dist/index.js`、`index.cjs`、`index.d.ts`、`style.css`
2. `pnpm typecheck`、`pnpm lint` 全量通过
3. 在 playground 中验证渲染、编辑回显、保存回调、复制与导出
4. 执行 `pnpm changeset` 记录变更后再发布
