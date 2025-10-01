import type { EChartsOption } from 'echarts';
import type { ChartConfig, ChartType, SettingItemKey } from '../types';

/** 图表类型元数据，新增图表类型只需实现该结构并登记 */
export type ChartMeta = {
  type: ChartType;
  /** 中文名称 */
  name: string;
  /** 默认配置项 */
  defaultConfig: ChartConfig;
  /** 抽屉中表单块的展示顺序 */
  settingKeys: SettingItemKey[];
  /** 由配置项派生 ECharts option */
  buildOption: (config: ChartConfig) => EChartsOption;
};
