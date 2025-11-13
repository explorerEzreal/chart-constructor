import type { FC } from 'react';
import { InputNumber, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

export type BarSeriesFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

const BarSeriesSettingItem: FC<BarSeriesFormProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="柱子宽度">
        <InputNumber
          min={1}
          max={80}
          addonAfter="px"
          value={value.barWidth}
          onChange={(barWidth) => update('barWidth', barWidth ?? 16)}
        />
      </Field>
      <Field label="柱子圆角">
        <InputNumber
          min={0}
          max={40}
          addonAfter="px"
          value={value.borderRadius}
          onChange={(borderRadius) => update('borderRadius', borderRadius ?? 0)}
        />
      </Field>
      <Field label="堆叠显示">
        <Switch checked={value.stack} onChange={(checked) => update('stack', checked)} />
      </Field>
    </>
  );
};

export default BarSeriesSettingItem;
