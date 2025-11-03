import type { LabelSetting } from '../../types';

/** 数值标签 option 片段，饼图与柱状图字段一致可共用 */
export type SeriesLabelOption = {
  show: boolean;
  position: LabelSetting['position'];
  formatter: string;
};

/** 由数值标签配置派生标签 option 片段，各图表类型共用 */
export const buildLabelOption = (label: LabelSetting): SeriesLabelOption => ({
  show: label.show,
  position: label.position,
  formatter: label.formatter,
});
