import type { EChartsOption } from 'echarts';
import type { TooltipSetting } from '../../types';

/** 提示框 option 片段类型，直接取自 ECharts option 保证可拼接 */
export type TooltipOption = EChartsOption['tooltip'];

/**
 * 由提示框配置派生提示框 option 片段，各图表类型共用
 * 触发方式取自配置结构：柱状图有 trigger 字段则用其值，饼图回落为数据项触发
 */
export const buildTooltipOption = (tooltip: TooltipSetting): TooltipOption =>
  tooltip.show
    ? {
        trigger: 'trigger' in tooltip ? tooltip.trigger : 'item',
        formatter: tooltip.formatter,
      }
    : { show: false };
