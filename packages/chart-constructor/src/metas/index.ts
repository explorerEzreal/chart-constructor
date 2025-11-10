import { barMeta } from './bar';
import { comboMeta } from './combo';
import { lineMeta } from './line';
import { pieMeta } from './pie';
import { scatterMeta } from './scatter';
import type { ChartMeta } from './type';
import type { ChartType } from '../types';

/** 内置图表元数据注册表，扩展新类型时在此登记 */
export const chartMetas: {
  pie: ChartMeta<'pie'>;
  bar: ChartMeta<'bar'>;
  line: ChartMeta<'line'>;
  scatter: ChartMeta<'scatter'>;
  combo: ChartMeta<'combo'>;
} = {
  pie: pieMeta,
  bar: barMeta,
  line: lineMeta,
  scatter: scatterMeta,
  combo: comboMeta,
};

/**
 * 按注册顺序返回全部图表元数据，供外部遍历渲染类型清单
 * 字面量声明顺序即返回顺序，新增类型只需在注册表登记
 * ChartMeta<'pie'> 因 buildOption 参数逆变无法直接赋给默认泛型，此处统一断言
 */
export const listChartMetas = (): ChartMeta[] =>
  Object.values(chartMetas) as unknown as ChartMeta[];

/** 获取指定图表类型的元数据 */
export const getChartMeta = <T extends ChartType>(type: T): ChartMeta<T> => {
  // 注册表按键声明已保证类型关联，此处仅做键到泛型的收窄
  const meta = chartMetas[type] as unknown as ChartMeta<T> | undefined;
  if (!meta) {
    throw new Error(`未注册的图表类型：${type}`);
  }
  return meta;
};

export type { ChartMeta };
export { barMeta, comboMeta, lineMeta, pieMeta, scatterMeta };
