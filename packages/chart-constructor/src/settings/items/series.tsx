import type { FC } from 'react';
import BarSeriesSettingItem from './series-bar';
import ComboSeriesSettingItem from './series-combo';
import LineSeriesSettingItem from './series-line';
import ScatterSeriesSettingItem from './series-scatter';
import type { SettingItemProps } from '../../types';

/** 系列样式表单：按图表类型分发到对应子表单 */
const SeriesSettingItem: FC<SettingItemProps> = ({ chartType, value, onChange }) => {
  if (chartType === 'line') {
    return <LineSeriesSettingItem value={value} onChange={onChange} />;
  }
  if (chartType === 'scatter') {
    return <ScatterSeriesSettingItem value={value} onChange={onChange} />;
  }
  if (chartType === 'combo') {
    return <ComboSeriesSettingItem value={value} onChange={onChange} />;
  }
  return <BarSeriesSettingItem value={value} onChange={onChange} />;
};

export default SeriesSettingItem;
