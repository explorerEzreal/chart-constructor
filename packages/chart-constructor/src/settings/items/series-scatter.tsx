import type { FC } from 'react';
import { InputNumber, Select } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const SYMBOL_OPTIONS = [
  { label: '圆形', value: 'circle' },
  { label: '方形', value: 'rect' },
  { label: '三角形', value: 'triangle' },
  { label: '菱形', value: 'diamond' },
];

export type ScatterSeriesFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

const ScatterSeriesSettingItem: FC<ScatterSeriesFormProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="点大小">
        <InputNumber
          min={1}
          max={40}
          addonAfter="px"
          value={value.symbolSize}
          onChange={(symbolSize) => update('symbolSize', symbolSize ?? 12)}
        />
      </Field>
      <Field label="点形状">
        <Select
          style={{ width: '100%' }}
          options={SYMBOL_OPTIONS}
          value={value.symbol}
          onChange={(symbol) => update('symbol', symbol)}
        />
      </Field>
    </>
  );
};

export default ScatterSeriesSettingItem;
