import type { FC } from 'react';
import BarDataSettingItem from './data-bar';
import ComboDataSettingItem from './data-combo';
import PieDataSettingItem from './data-pie';
import ScatterDataSettingItem from './data-scatter';
import type { SettingItemProps } from '../../types';

const DataSettingItem: FC<SettingItemProps> = ({ chartType, value, onChange }) => {
  if (chartType === 'pie') {
    return <PieDataSettingItem value={value} onChange={onChange} />;
  }
  if (chartType === 'scatter') {
    return <ScatterDataSettingItem value={value} onChange={onChange} />;
  }
  if (chartType === 'combo') {
    return <ComboDataSettingItem value={value} onChange={onChange} />;
  }
  // 柱状图与折线图共用分类序列编辑器
  return <BarDataSettingItem value={value} onChange={onChange} />;
};

export default DataSettingItem;
