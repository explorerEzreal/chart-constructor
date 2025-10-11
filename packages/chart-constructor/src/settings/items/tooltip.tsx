import type { FC } from 'react';
import { Input, Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const TRIGGER_OPTIONS = [
  { label: '坐标轴', value: 'axis' },
  { label: '数据项', value: 'item' },
];

/** 提示框配置表单，柱状图额外支持触发方式 */
const TooltipSettingItem: FC<SettingItemProps> = ({ chartType, value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });
  const formatterPlaceholder = chartType === 'bar' ? '{b}: {c}' : '{b}: {c} ({d}%)';

  return (
    <>
      <Field label="显示提示">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      {chartType === 'bar' ? (
        <Field label="触发方式">
          <Select
            style={{ width: '100%' }}
            options={TRIGGER_OPTIONS}
            value={value.trigger}
            onChange={(trigger) => update('trigger', trigger)}
          />
        </Field>
      ) : null}
      <Field label="提示格式">
        <Input
          value={value.formatter}
          placeholder={formatterPlaceholder}
          onChange={(event) => update('formatter', event.target.value)}
        />
      </Field>
    </>
  );
};

export default TooltipSettingItem;
