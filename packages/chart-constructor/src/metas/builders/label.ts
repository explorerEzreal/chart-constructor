import type { LabelSetting } from '../../types';

/** 数值标签 option 片段，饼图与直角坐标系图表字段一致可共用 */
export type SeriesLabelOption<P extends string = string> = {
  show: boolean;
  position: P;
  formatter: string;
};

/**
 * 由数值标签配置派生标签 option 片段，各图表类型共用
 * 位置类型随入参标签配置收窄，避免把饼图位置串到折线/散点
 */
export const buildLabelOption = <T extends LabelSetting>(
  label: T
): SeriesLabelOption<T['position']> => ({
  show: label.show,
  position: label.position,
  formatter: label.formatter,
});
