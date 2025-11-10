import type { FC } from 'react';
import { InputNumber, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

export type LineSeriesFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

/** 折线图系列样式表单 */
const LineSeriesSettingItem: FC<LineSeriesFormProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="线宽">
        <InputNumber
          min={1}
          max={20}
          addonAfter="px"
          value={value.lineWidth}
          onChange={(lineWidth) => update('lineWidth', lineWidth ?? 2)}
        />
      </Field>
      <Field label="平滑曲线">
        <Switch checked={value.smooth} onChange={(checked) => update('smooth', checked)} />
      </Field>
      <Field label="面积填充">
        <Switch checked={value.area} onChange={(checked) => update('area', checked)} />
      </Field>
      <Field label="显示数据点">
        <Switch checked={value.showSymbol} onChange={(checked) => update('showSymbol', checked)} />
      </Field>
      <Field label="点大小">
        <InputNumber
          min={1}
          max={40}
          addonAfter="px"
          value={value.symbolSize}
          onChange={(symbolSize) => update('symbolSize', symbolSize ?? 6)}
        />
      </Field>
    </>
  );
};

export default LineSeriesSettingItem;
