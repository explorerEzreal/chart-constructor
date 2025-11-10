import type { FC } from 'react';
import { Input, Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const PIE_POSITION_OPTIONS = [
  { label: '外部', value: 'outside' },
  { label: '内部', value: 'inside' },
];

const BAR_POSITION_OPTIONS = [
  { label: '顶部', value: 'top' },
  { label: '内部', value: 'inside' },
  { label: '内部顶部', value: 'insideTop' },
];

const LINE_POSITION_OPTIONS = [
  { label: '顶部', value: 'top' },
  { label: '底部', value: 'bottom' },
  { label: '内部', value: 'inside' },
];

/** 数值标签配置表单，标签位置按图表类型取不同候选项 */
const LabelSettingItem: FC<SettingItemProps> = ({ chartType, value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });
  const positionOptions =
    chartType === 'bar'
      ? BAR_POSITION_OPTIONS
      : chartType === 'pie'
        ? PIE_POSITION_OPTIONS
        : LINE_POSITION_OPTIONS;
  const formatterPlaceholder = chartType === 'pie' ? '{b}: {d}%' : '{c}';

  return (
    <>
      <Field label="显示标签">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="标签位置">
        <Select
          style={{ width: '100%' }}
          options={positionOptions}
          value={value.position}
          onChange={(position) => update('position', position)}
        />
      </Field>
      <Field label="标签格式">
        <Input
          value={value.formatter}
          placeholder={formatterPlaceholder}
          onChange={(event) => update('formatter', event.target.value)}
        />
      </Field>
    </>
  );
};

export default LabelSettingItem;
