import type { FC } from 'react';
import { InputNumber, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

export type ComboSeriesFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

/** 折线柱状图系列样式表单：柱状与折线样式集中配置，共用单 Y 轴 */
const ComboSeriesSettingItem: FC<ComboSeriesFormProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="柱子宽度">
        <InputNumber
          min={1}
          max={80}
          addonAfter="px"
          value={value.barWidth}
          onChange={(barWidth) => update('barWidth', barWidth ?? 20)}
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

export default ComboSeriesSettingItem;
