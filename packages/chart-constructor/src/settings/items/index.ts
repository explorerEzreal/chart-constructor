import type { FC } from 'react';
import DataSettingItem from './data';
import LabelSettingItem from './label';
import LegendSettingItem from './legend';
import TitleSettingItem from './title';
import TooltipSettingItem from './tooltip';
import type { SettingItemKey, SettingItemProps } from '../../types';

/** 表单项定义 */
export type SettingItemDefinition = {
  title: string;
  component: FC<SettingItemProps>;
};

/** 抽屉表单块注册表，key 与配置项字段保持一致 */
export const settingItems: Record<SettingItemKey, SettingItemDefinition> = {
  data: { title: '数据', component: DataSettingItem },
  title: { title: '标题', component: TitleSettingItem },
  legend: { title: '图例', component: LegendSettingItem },
  label: { title: '数值标签', component: LabelSettingItem },
  tooltip: { title: '提示框', component: TooltipSettingItem },
};
