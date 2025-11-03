import type { ChartSettings, ChartType } from '../../types';

/** option 片段构建上下文，承载片段自身配置之外的跨块派生信息 */
export type SettingBuildContext = {
  /** 当前图表类型，供片段按需收窄配置块联合类型 */
  type: ChartType;
  /** 当前图表完整的配置块集合 */
  settings: ChartSettings;
  /** 图例是否排在标题下方：直角坐标系图表为 true，饼图等贴顶图表为 false */
  legendBelowTitle: boolean;
};
