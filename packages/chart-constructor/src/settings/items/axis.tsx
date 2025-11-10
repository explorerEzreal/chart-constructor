import type { FC } from 'react';
import { Input, InputNumber, Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

export type AxisVariant = 'x' | 'y';

/** X 轴名称位置选项 */
const NAME_LOCATION_OPTIONS = [
  { label: '起点', value: 'start' },
  { label: '居中', value: 'middle' },
  { label: '末端', value: 'end' },
];

type AxisSettingProps = Pick<SettingItemProps, 'value' | 'onChange'> & {
  variant: AxisVariant;
};

/** 坐标轴配置表单，variant 区分 X/Y 轴字段差异 */
const AxisSettingItem: FC<AxisSettingProps> = ({ variant, value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="显示坐标轴">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="轴名称">
        <Input value={value.name} onChange={(event) => update('name', event.target.value)} />
      </Field>
      {variant === 'x' ? (
        <>
          <Field label="轴名称位置">
            <Select
              style={{ width: '100%' }}
              options={NAME_LOCATION_OPTIONS}
              value={value.nameLocation}
              onChange={(nameLocation) => update('nameLocation', nameLocation)}
            />
          </Field>
          <Field label="标签旋转">
            <InputNumber
              min={0}
              max={90}
              addonAfter="°"
              value={value.labelRotate}
              onChange={(labelRotate) => update('labelRotate', labelRotate ?? 0)}
            />
          </Field>
        </>
      ) : (
        <Field label="显示网格线">
          <Switch
            checked={value.showSplitLine}
            onChange={(checked) => update('showSplitLine', checked)}
          />
        </Field>
      )}
    </>
  );
};

/** X 轴配置表单 */
export const XAxisSettingItem: FC<SettingItemProps> = ({ value, onChange }) => (
  <AxisSettingItem variant="x" value={value} onChange={onChange} />
);

/** Y 轴配置表单 */
export const YAxisSettingItem: FC<SettingItemProps> = ({ value, onChange }) => (
  <AxisSettingItem variant="y" value={value} onChange={onChange} />
);
