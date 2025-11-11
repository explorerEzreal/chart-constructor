---
"chart-constructor": minor
---

CEchart 新增 `toolbarMode` 配置项（`static` / `float`）：默认 `static` 保持操作栏常驻图表上方；`float` 时操作栏脱离文档流悬浮在图表右上角，带描边、圆角与浅阴影，鼠标悬停图表或键盘聚焦内部时淡入、移出淡出，图表占满整个高度。触屏等无 hover 能力的设备自动回退为常显悬浮角标。同步导出 `ToolbarMode` 类型，示例页新增操作栏形态切换开关
