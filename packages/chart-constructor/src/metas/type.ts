import type { EChartsOption } from 'echarts';
import type { ChartConfigMap, ChartType, SettingItemKey } from '../types';

/** 图表类型元数据，新增图表类型只需实现该结构并登记 */
export type ChartMeta<T extends ChartType = ChartType> = {
  type: T;
  /** 中文名称 */
  name: string;
  defaultConfig: ChartConfigMap[T];
  /** 抽屉中表单块的展示顺序 */
  settingKeys: SettingItemKey[];
  buildOption: (config: ChartConfigMap[T]) => EChartsOption;
};
