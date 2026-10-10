# chart-constructor

> 发布包名：`react-chart-constructor`（npm 上 `chart-constructor` 已被他人占用，仅包名不同，API 与目录结构不变）

基于 React 与 ECharts 的图表构造器组件库。传入一段配置项 JSON 即可渲染图表，组件自带操作栏与右侧配置抽屉：抽屉顶部内嵌实时预览图，编辑只改草稿，点保存才提交并通过回调输出最新配置项，可直接写入数据库。

## 仓库结构

```
.
├── apps
│   └── playground                                # 在线演示站（首页 + 指南 + 示例页），线上 https://chart.supershiba.cn
├── packages
│   ├── chart-constructor                         # 唯一发布包（发布名 react-chart-constructor）
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
pnpm version-packages # 生成版本号与 CHANGELOG
```

## CEchart 用法

```tsx
import { CEchart } from 'react-chart-constructor';
import type { ChartConfig } from 'react-chart-constructor';
import 'react-chart-constructor/style.css';

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

### 配置项结构

内置图表类型：`pie`（饼图）、`bar`（柱状图）、`line`（折线图）、`scatter`（散点图）、`combo`（折线柱状图）。切换类型时用 `createDefaultConfig(type)` 生成对应默认配置。

`ChartConfig` 为下列配置的联合类型，统一为 `{ version: 1, type, data, settings }`：

| 图表类型 | `data` 结构 | `settings.series` 专属字段 |
| --- | --- | --- |
| `pie` | `{ seriesName, list: [{ name, value }] }` | - |
| `bar` | `{ categories, series: [{ name, data }] }` | `barWidth`、`borderRadius`、`stack` |
| `line` | `{ categories, series: [{ name, data }] }` | `lineWidth`、`smooth`、`area`、`showSymbol`、`symbolSize` |
| `scatter` | `{ series: [{ name, data: [[x, y]] }] }`（数值 x/y 轴） | `symbolSize`、`symbol` |
| `combo` | `{ categories, series: [{ name, type: 'bar' \| 'line', data }] }` | 柱状与折线字段合并，共用单 Y 轴 |

`settings` 共用 `title`、`legend`、`label`、`tooltip`，直角坐标系图表另有 `xAxis`、`yAxis`。`title` 为 `{ show, text, subtext, left, textStyle }`；`label` 的 `position` 取值随图表类型不同；`xAxis` 含 `nameLocation` 与 `labelRotate`，`yAxis` 含 `showSplitLine`。

### 组件 props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `ChartConfig` | - | 初始配置项，未传入时使用内置饼图默认配置；`defaultValue` 为 `value` 的别名 |
| `data` | `DataSource` | - | 数据源：数据块、同步取数函数或异步取数函数；取数结果优先于 `value` 中的数据 |
| `defaultData` | `DeepPartial<ChartData>` | - | 实例级兜底数据，仅在无取数结果且未提供 `value.data` 时生效，按差异字段深合并 |
| `onChange` | `(config: ChartConfig) => void` | - | 点击保存后输出的配置项，草稿与已提交值一致时不触发 |
| `onSave` | `(config: ChartConfig) => void` | - | 点击保存时输出的最新配置项，始终触发 |
| `showToolbar` | `boolean` | `true` | 是否展示操作栏 |
| `toolbarMode` | `'static' \| 'float'` | `'static'` | 操作栏展示形态：`static` 常驻在图表上方，`float` 悬浮在图表右上角并在悬停时淡入 |
| `tools` | `ToolItem[]` | - | 自定义工具项，同 key 覆盖内置项，新 key 追加 |
| `editable` | `boolean` | `true` | 是否允许编辑 |
| `width` / `height` | `number \| string` | `'100%'` | 容器尺寸 |
| `theme` | `string \| object` | - | ECharts 主题 |
| `className` / `style` | - | - | 容器样式扩展 |
| `onReady` | `(instance: ECharts) => void` | - | 图表实例就绪回调 |

内置工具项：`edit`、`refreshData`（仅 `data` 为取数函数时出现）、`copyConfig`、`copyOption`、`downloadPng`、`screenshot`、`reset`。

自定义工具项结构为 `{ key, label, icon?, tooltip?, onClick? }`：`label` 为按钮文字，`tooltip` 为可选的悬停提示，仅在显式传入时展示，适合把工具栏做成纯图标按钮的场景。

悬浮形态下操作栏脱离文档流，图表占满整个高度；鼠标悬停图表或键盘聚焦内部时淡入，移出淡出，触屏等无 hover 能力的设备保持常显。

### 数据源

`data` 可传数据块、同步函数或异步函数，取数结果写回配置中的数据块，抽屉照常可编辑，保存后经 `onSave` 输出。`data` 为函数时组件挂载后立即请求，并在操作栏提供「刷新数据」；请求期间图表区盖半透明遮罩，失败提示「请求失败，请稍后重试」并保留上一次数据，连点刷新只取最后一次结果。

```tsx
import { CEchart } from 'react-chart-constructor';
import type { LineChartConfig } from 'react-chart-constructor';

// data 为函数时，入参给出图表类型、当前配置与取消信号，返回值需匹配该图表类型的数据结构
export const Demo = () => (
  <div style={{ height: 420 }}>
    <CEchart<LineChartConfig>
      value={config}
      height="100%"
      data={async ({ type, signal }) => {
        const res = await fetch(`/api/chart/${type}`, { signal });
        return res.json();
      }}
      onSave={(next) => saveToDatabase(next)}
    />
  </div>
);
```

三层数据的优先级为「`data` 取数结果 → `value.data` → `defaultData` → 内置默认数据」：`data` 为函数时数据由数据源托管，外部 `value` 变化只同步类型与配置项，不会冲掉取数结果；切换图表类型时回落该类型并重新取数；「重置」回到该类型默认配置后同样会重新取数。

### 导出内容

组件 `CEchart`（同时作为默认导出）、工具函数 `buildOption`、`createDefaultConfig`、`normalizeConfig`、`listChartMetas`、`getChartMeta`、`registerTheme`、`setDefaultTheme`、`getDefaultTheme`，以及 `CEchartProps`、`ChartConfig`、`ChartConfigMap`、`ChartDataMap`、`ChartData`、`DataSource`、`DataSourceContext`、`DeepPartial`、`PieChartConfig`、`BarChartConfig`、`LineChartConfig`、`ScatterChartConfig`、`ComboChartConfig`、`ChartType`、`ChartTheme`、`ChartMeta`、`ToolItem`、`ToolContext`、`ToolbarMode` 等类型。

## 主题

主题复用 ECharts 原生机制，不进入 `ChartConfig`、不写入数据库。组件初始化时按 `theme` prop 优先、全局默认主题兜底的方式决定外观。

```tsx
import { CEchart, registerTheme, setDefaultTheme } from 'react-chart-constructor';

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

`react`、`react-dom`、`echarts`、`antd` 为 `react-chart-constructor` 的 peerDependencies，由使用方安装；`ahooks`、`@ant-design/icons` 为包内依赖。

## playground 部署上线

线上地址：`https://chart.supershiba.cn`，部署在腾讯云服务器 `106.55.36.91`，复用 Dubhe 已有的 Caddy 负责 HTTPS 与反向代理。

### 架构

- 服务器目录 `/opt/chart-constructor`：`releases/<版本>` 存历史产物，`current` 为相对软链指向当前版本，`caddy/` 存 Caddy 站点片段
- 静态站点由 `chart-constructor-web`（`nginx:alpine`）容器提供，只加入 Dubhe 的 `dubhe_default` 网络，不占用宿主机端口
- Dubhe 的 Caddy 通过 `import /etc/caddy/sites/chart-constructor.caddy` 加载子域名站点块，证书由 Caddy 自动签发与续期
- 保留最近 5 个版本，回滚只需切换软链

### 自动发布

推送 `master`，或在 GitHub Actions 页面手动触发「发布 playground」：先执行 `pnpm typecheck`、`pnpm lint`、`pnpm build`，全部通过后上传产物、切换软链、重启容器并做线上健康检查。

需要在仓库 Settings → Secrets and variables → Actions 中配置：

| Secret | 值 |
| --- | --- |
| `DEPLOY_HOST` | `106.55.36.91` |
| `DEPLOY_USER` | `ubuntu` |
| `DEPLOY_SSH_KEY` | 服务器登录私钥全文 |
| `DEPLOY_PATH` | `/opt/chart-constructor`，可省略，默认同值 |

### 首次初始化

```bash
# 1. 本地把部署资产推到服务器后，在服务器上创建目录并启动静态容器（目录创建需要 sudo）
rsync -az deploy/ ubuntu@106.55.36.91:/tmp/chart-constructor-deploy/
ssh ubuntu@106.55.36.91 "sudo mkdir -p /opt/chart-constructor && bash /tmp/chart-constructor-deploy/bootstrap.sh"

# 2. Dubhe 仓库同步 Caddy 站点挂载，让 Caddy 加载子域名配置（会造成数秒中断）
cd /opt/dubhe && git pull --ff-only origin main && docker compose up -d proxy
```

前置条件：在域名服务商把 `chart.supershiba.cn` 解析到 `106.55.36.91`，否则 HTTPS 证书签发失败（Caddy 会自动重试，失败期间域名不可访问）。

### 回滚

```bash
cd /opt/chart-constructor
ls -1dt releases/*/                    # 查看历史版本
ln -sfn releases/<目标版本> current     # 切回目标版本，无需重启容器
```

## 发布前检查

1. `pnpm build` 产出 `packages/chart-constructor/dist/index.js`、`index.cjs`、`index.d.ts`、`style.css`
2. `pnpm typecheck`、`pnpm lint` 全量通过
3. 在 playground 中验证渲染、编辑回显、保存回调、复制与导出
4. 执行 `pnpm changeset` 记录变更，`pnpm version-packages` 生成版本号与 CHANGELOG
5. 在 `packages/chart-constructor` 下执行 `npm publish --dry-run` 校验 tarball，再执行 `npm publish --access public` 发布
