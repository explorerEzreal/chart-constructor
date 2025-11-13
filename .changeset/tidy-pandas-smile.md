---
'react-chart-constructor': minor
---

新增数据源能力：`CEchart` 的 `data` 支持数据块、同步取数函数与异步取数函数，`defaultData` 提供实例级兜底数据；数据源为函数时挂载自动请求、操作栏提供「刷新数据」、请求期间显示加载遮罩、失败统一提示并保留上一次数据
