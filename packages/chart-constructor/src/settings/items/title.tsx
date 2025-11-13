import type { FC } from 'react';
import { ColorPicker, Input, InputNumber, Select, Switch } from 'antd';
import { Field } from '../components';
import type { SettingItemProps } from '../../types';

const LEFT_OPTIONS = [
  { label: '左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右', value: 'right' },
];

const FONT_WEIGHT_OPTIONS = [
  { label: 'normal', value: 'normal' },
  { label: 'bold', value: 'bold' },
  { label: 'bolder', value: 'bolder' },
  { label: 'lighter', value: 'lighter' },
];

const TitleSettingItem: FC<SettingItemProps> = ({ value, onChange }) => {
  const textStyle = value.textStyle;
  const update = (name: string, payload: unknown) => onChange({ name, payload });
  const updateTextStyle = (name: string, payload: unknown) =>
    update('textStyle', { ...textStyle, [name]: payload });

  return (
    <>
      <Field label="显示标题">
        <Switch checked={value.show} onChange={(checked) => update('show', checked)} />
      </Field>
      <Field label="标题内容">
        <Input value={value.text} onChange={(event) => update('text', event.target.value)} />
      </Field>
      <Field label="副标题">
        <Input value={value.subtext} onChange={(event) => update('subtext', event.target.value)} />
      </Field>
      <Field label="标题位置">
        <Select
          style={{ width: '100%' }}
          options={LEFT_OPTIONS}
          value={value.left}
          onChange={(left) => update('left', left)}
        />
      </Field>
      <Field label="标题颜色">
        <ColorPicker
          format="hex"
          value={textStyle.color}
          onChangeComplete={(color) => updateTextStyle('color', color.toHexString())}
        />
      </Field>
      <Field label="字体大小">
        <InputNumber
          min={12}
          max={48}
          value={textStyle.fontSize}
          onChange={(fontSize) => updateTextStyle('fontSize', fontSize ?? 18)}
        />
      </Field>
      <Field label="字体粗细">
        <Select
          style={{ width: '100%' }}
          options={FONT_WEIGHT_OPTIONS}
          value={textStyle.fontWeight}
          onChange={(fontWeight) => updateTextStyle('fontWeight', fontWeight)}
        />
      </Field>
    </>
  );
};

export default TitleSettingItem;
