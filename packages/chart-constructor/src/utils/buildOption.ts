import type { EChartsOption } from 'echarts';
import { barMeta } from '../metas/bar';
import { comboMeta } from '../metas/combo';
import { lineMeta } from '../metas/line';
import { pieMeta } from '../metas/pie';
import { scatterMeta } from '../metas/scatter';
import type { ChartConfig } from '../types';

/** 由配置项派生 ECharts option，按类型显式分发以保留联合类型收敛 */
export const buildOption = (config: ChartConfig): EChartsOption => {
  switch (config.type) {
    case 'bar':
      return barMeta.buildOption(config);
    case 'line':
      return lineMeta.buildOption(config);
    case 'scatter':
      return scatterMeta.buildOption(config);
    case 'combo':
      return comboMeta.buildOption(config);
    case 'pie':
      return pieMeta.buildOption(config);
    default:
      return pieMeta.buildOption(config);
  }
};
