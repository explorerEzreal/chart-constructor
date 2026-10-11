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

线上地址：`https://chart.supershiba.cn`。Jenkins 负责检出代码、构建静态产物并上传；服务器只负责发布、切换版本和回滚，Nginx 直接提供静态文件。

### 架构

```text
GitHub
  ↓
Jenkins 检出并构建 apps/playground/dist
  ↓ tar.gz + SSH 标准输入
服务器执行 publish <SHA>
  ↓ 原子切换 releases/current
Nginx
```

- Jenkins 使用 Node `24.21.0` 和 pnpm `11.25.0`，不在生产服务器执行前端构建。
- 服务器目录 `/srv/chart-constructor`：`releases/<版本>` 保存历史产物，`current` 和 `previous` 为相对软链，保留最近 5 个版本。
- 构建产物解压后根目录直接包含 `index.html`、`assets/`、`favicon.svg` 和 `.deploy-sha`。
- 服务器完成健康检查后切换 `current`；失败时自动恢复 `previous`。
- Nginx 使用现有 `*.supershiba.cn` 证书，提供 SPA 回退、入口 HTML 不缓存和 `/assets/` 长期缓存策略。

### Jenkins 配置

1. 安装 Jenkins `nodejs` 插件，新增全局 Node 工具 `node-24.21.0`，并安装全局包 `pnpm@11.25.0`。
2. 在 Jenkins 凭据中配置 SSH 用户名和私钥凭据，ID 为 `chart-constructor-server-deploy`，用户名 `ubuntu`。
3. Pipeline 脚本保存在 Jenkins 任务的 `Pipeline script` 配置中，项目仓库不维护 `Jenkinsfile`。
4. 任务参数：
   - `ACTION`：`deploy` 或 `rollback`，默认 `deploy`。
   - `TARGET_SHA`：完整 40 位 SHA；发布时留空则使用 `master` 当前 HEAD。
5. 发布流程为：检出目标 SHA、安装依赖、类型检查、代码检查、构建、归档 tar.gz、上传产物、执行服务器 `publish <SHA>`。
6. `ACTION=rollback` 时跳过构建，直接调用服务器回滚命令。
7. 任务不配置 SCM、GitHub Webhook 或其他自动触发器，只从 Jenkins 页面手动启动。

### 服务器发布命令

服务器 `/usr/local/bin/deploy-chart-constructor` 提供：

```text
publish <40位SHA>   # 从标准输入接收 tar.gz，校验后切换版本
rollback            # 切换到 previous
```

Jenkins 私钥在服务器 `authorized_keys` 中通过 `restrict,command="..."` 限制为上述命令，不能执行任意 Shell 命令。

### 首次初始化

```bash
# 1. 部署发布脚本
ssh ubuntu@106.55.36.91
sudo install -m 0755 /tmp/deploy-chart-constructor /usr/local/bin/deploy-chart-constructor

# 2. 初始化发布目录
sudo mkdir -p /srv/chart-constructor/releases /var/www/certbot
sudo chown -R ubuntu:ubuntu /srv/chart-constructor

# 3. 安装 Nginx 站点配置
sudo cp deploy/nginx/chart.supershiba.cn.conf /etc/nginx/sites-available/chart.supershiba.cn.conf
sudo ln -sfn /etc/nginx/sites-available/chart.supershiba.cn.conf /etc/nginx/sites-enabled/chart.supershiba.cn.conf
sudo nginx -t
sudo systemctl reload nginx
```

为 Jenkins 生成独立部署密钥，并将公钥加入 `/home/ubuntu/.ssh/authorized_keys`：

```text
restrict,command="/usr/local/bin/deploy-chart-constructor" ssh-ed25519 <公钥>
```

前置条件：`chart.supershiba.cn` 的 A 记录指向 `106.55.36.91`，Nginx 证书文件 `/etc/nginx/ssl/supershiba.cn/fullchain.pem` 和 `/etc/nginx/ssl/supershiba.cn/privkey.pem` 存在且覆盖该域名。

### 手动发布与回滚

在 Jenkins 任务中点击“Build with Parameters”：

```text
ACTION=deploy
TARGET_SHA=完整提交 SHA；留空时发布 master 当前 HEAD
```

```text
ACTION=rollback
TARGET_SHA=留空
```

发布完成后检查：

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://chart.supershiba.cn/
curl -fsS -o /dev/null -w '%{http_code}\n' https://chart.supershiba.cn/demo
curl -fsS -o /dev/null -w '%{http_code}\n' https://chart.supershiba.cn/guide
```

## 发布前检查

1. `pnpm build` 产出 `packages/chart-constructor/dist/index.js`、`index.cjs`、`index.d.ts`、`style.css`
2. `pnpm typecheck`、`pnpm lint` 全量通过
3. 在 playground 中验证渲染、编辑回显、保存回调、复制与导出
4. 执行 `pnpm changeset` 记录变更，`pnpm version-packages` 生成版本号与 CHANGELOG
5. 在 `packages/chart-constructor` 下执行 `npm publish --dry-run` 校验 tarball，再执行 `npm publish --access public` 发布
