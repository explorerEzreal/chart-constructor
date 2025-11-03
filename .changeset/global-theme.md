---
"chart-constructor": minor
---

新增全局主题注册入口：导出 `registerTheme` 包装 `echarts.registerTheme`，导出 `setDefaultTheme` / `getDefaultTheme` 维护全局默认主题；未显式传入 `theme` 的图表自动套用全局默认，且运行期切换主题时同步重建。新增 `ChartTheme` 类型，主题不进入 `ChartConfig`
