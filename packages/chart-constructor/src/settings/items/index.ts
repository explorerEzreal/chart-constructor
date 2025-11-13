import type { FC } from 'react';
import { XAxisSettingItem, YAxisSettingItem } from './axis';
import DataSettingItem from './data';
import LabelSettingItem from './label';
import LegendSettingItem from './legend';
import SeriesSettingItem from './series';
import TitleSettingItem from './title';
import TooltipSettingItem from './tooltip';
import type { SettingItemKey, SettingItemProps } from '../../types';

export type SettingItemDefinition = {
  title: string;
  component: FC<SettingItemProps>;
};

/** 抽屉表单项分组，数组顺序即 tab 顺序 */
export type SettingGroupDefinition = {
  key: string;
  title: string;
  /** 归属该分组的表单块，块内顺序以图表元数据的 settingKeys 为准 */
  items: SettingItemKey[];
};

/** 抽屉表单块注册表，key 与配置项字段保持一致 */
export const settingItems: Record<SettingItemKey, SettingItemDefinition> = {
  data: { title: '数据', component: DataSettingItem },
  title: { title: '标题', component: TitleSettingItem },
  legend: { title: '图例', component: LegendSettingItem },
  label: { title: '数值标签', component: LabelSettingItem },
  tooltip: { title: '提示框', component: TooltipSettingItem },
  xAxis: { title: 'X 轴', component: XAxisSettingItem },
  yAxis: { title: 'Y 轴', component: YAxisSettingItem },
  series: { title: '系列样式', component: SeriesSettingItem },
};

/** 抽屉表单分组：数据独立，标注收纳说明性元素，系列样式归入其他 */
export const settingGroups: SettingGroupDefinition[] = [
  { key: 'data', title: '数据', items: ['data'] },
  {
    key: 'annotation',
    title: '标注',
    items: ['title', 'legend', 'label', 'tooltip', 'xAxis', 'yAxis'],
  },
  { key: 'other', title: '其他', items: ['series'] },
];
