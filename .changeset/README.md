# 版本管理说明

使用 changesets 管理 `chart-constructor` 的版本与变更日志。

```bash
# 记录一次变更
pnpm changeset

# 生成版本号与 CHANGELOG
pnpm version-packages
```

发布包为 `react-chart-constructor`，内部包与 playground 已在 `config.json` 中忽略。

```bash
# 发布流程
pnpm changeset          # 记录变更
pnpm version-packages   # 生成版本号与 CHANGELOG
cd packages/chart-constructor && npm publish --access public
```
