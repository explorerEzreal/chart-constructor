import { pieMeta } from './pie';
import type { ChartMeta } from './type';
import type { ChartType } from '../types';

/** 内置图表元数据注册表，扩展新类型时在此登记 */
export const chartMetas: Record<ChartType, ChartMeta> = {
  pie: pieMeta,
};

/** 获取指定图表类型的元数据 */
export const getChartMeta = (type: ChartType): ChartMeta => {
  const meta = chartMetas[type];
  if (!meta) {
    throw new Error(`未注册的图表类型：${type}`);
  }
  return meta;
};

export type { ChartMeta };
export { pieMeta };
