import type { EChartsOption } from 'echarts';
import { getChartMeta } from '../metas';
import type { ChartConfig } from '../types';

/** 由配置项派生 ECharts option */
export const buildOption = (config: ChartConfig): EChartsOption =>
  getChartMeta(config.type).buildOption(config);
