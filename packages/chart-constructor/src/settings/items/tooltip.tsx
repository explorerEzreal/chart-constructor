import type { FC } from 'react';
import { Input, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

/** 提示框配置表单 */
const TooltipSettingItem: FC<SettingItemProps> = ({ value, onChange }) => {
  const update = (name: string, payload: unknown) => onChange({ name, payload });

  return (
    <>
      <Field label="显示提示">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="提示格式">
        <Input
          value={value.formatter}
          placeholder="{b}: {c} ({d}%)"
          onChange={(event) => update('formatter', event.target.value)}
        />
      </Field>
    </>
  );
};

export default TooltipSettingItem;
