import type { FC } from 'react';
import { Input, Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const POSITION_OPTIONS = [
  { label: '外部', value: 'outside' },
  { label: '内部', value: 'inside' },
];

/** 数值标签配置表单 */
const LabelSettingItem: FC<SettingItemProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="显示标签">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="标签位置">
        <Select
          style={{ width: '100%' }}
          options={POSITION_OPTIONS}
          value={value.position}
          onChange={(position) => update('position', position)}
        />
      </Field>
      <Field label="标签格式">
        <Input
          value={value.formatter}
          placeholder="{b}: {d}%"
          onChange={(event) => update('formatter', event.target.value)}
        />
      </Field>
    </>
  );
};

export default LabelSettingItem;
