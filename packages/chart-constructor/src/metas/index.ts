import { barMeta } from './bar';
import { pieMeta } from './pie';
import type { ChartMeta } from './type';
import type { ChartType } from '../types';

/** 内置图表元数据注册表，扩展新类型时在此登记 */
export const chartMetas: {
  pie: ChartMeta<'pie'>;
  bar: ChartMeta<'bar'>;
} = {
  pie: pieMeta,
  bar: barMeta,
};

/** 图表类型展示顺序，新增类型时需与注册表同步登记 */
const chartMetaList = [pieMeta, barMeta] as const;

/**
 * 按注册顺序返回全部图表元数据，供外部遍历渲染类型清单
 * ChartMeta<'pie'> 因 buildOption 参数逆变无法直接赋给默认泛型，此处统一断言
 */
export const listChartMetas = (): ChartMeta[] =>
  [...chartMetaList] as unknown as ChartMeta[];

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
export { barMeta, pieMeta };
