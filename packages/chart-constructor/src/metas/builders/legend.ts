import type { EChartsOption } from 'echarts';
import type { LegendSetting } from '../../types';
import type { SettingBuildContext } from './context';
import { resolveLegendTop } from './layout';

/** 图例 option 片段类型，直接取自 ECharts option 保证可拼接 */
export type LegendOption = EChartsOption['legend'];

/**
 * 由图例配置派生图例 option 片段，各图表类型共用
 * 排在标题下方的图表需要写入 top，贴顶图表不写该字段
 */
export const buildLegendOption = (
  legend: LegendSetting,
  context: SettingBuildContext,
): LegendOption =>
  legend.show
    ? {
        orient: legend.orient,
        left: legend.left,
        // 不写 top 时保持字段缺省，避免产生 undefined 键
        ...(context.legendBelowTitle ? { top: resolveLegendTop(context) } : {}),
      }
    : { show: false };
