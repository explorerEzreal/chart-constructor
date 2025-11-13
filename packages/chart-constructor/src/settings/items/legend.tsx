import type { FC } from 'react';
import { Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const ORIENT_OPTIONS = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' },
];

const LEFT_OPTIONS = [
  { label: '左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右', value: 'right' },
];

const LegendSettingItem: FC<SettingItemProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="显示图例">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="排列方向">
        <Select
          style={{ width: '100%' }}
          options={ORIENT_OPTIONS}
          value={value.orient}
          onChange={(orient) => update('orient', orient)}
        />
      </Field>
      <Field label="图例位置">
        <Select
          style={{ width: '100%' }}
          options={LEFT_OPTIONS}
          value={value.left}
          onChange={(left) => update('left', left)}
        />
      </Field>
    </>
  );
};

export default LegendSettingItem;
