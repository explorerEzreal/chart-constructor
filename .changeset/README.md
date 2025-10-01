# 版本管理说明

使用 changesets 管理 `chart-constructor` 的版本与变更日志。

```bash
# 记录一次变更
pnpm changeset

# 生成版本号与 CHANGELOG
pnpm version-packages
```

当前阶段仅初始化流程，不执行发布；内部包与 playground 已在 `config.json` 中忽略。
