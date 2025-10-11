import type { EChartsOption } from 'echarts';
import { barMeta } from '../metas/bar';
import { pieMeta } from '../metas/pie';
import type { ChartConfig } from '../types';

/** 由配置项派生 ECharts option，按类型显式分发以保留联合类型收敛 */
export const buildOption = (config: ChartConfig): EChartsOption => {
  switch (config.type) {
    case 'bar':
      return barMeta.buildOption(config);
    case 'pie':
      return pieMeta.buildOption(config);
    default:
      return pieMeta.buildOption(config);
  }
};
