import type { FC } from 'react';
import BarDataSettingItem from './data-bar';
import PieDataSettingItem from './data-pie';
import type { SettingItemProps } from '../../types';

/** 数据配置表单：按图表类型分发到对应编辑器 */
const DataSettingItem: FC<SettingItemProps> = ({ chartType, value, onChange }) => {
  if (chartType === 'bar') {
    return <BarDataSettingItem value={value} onChange={onChange} />;
  }
  return <PieDataSettingItem value={value} onChange={onChange} />;
};

export default DataSettingItem;
