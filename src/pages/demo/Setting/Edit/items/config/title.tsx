import { Input, Select, ColorPicker, InputNumber } from 'antd';
import React from 'react';

const LEFT_OPTIONS = [
  {
    label: '左',
    value: 'left',
  },
  {
    label: '右',
    value: 'right',
  },
  {
    label: '中',
    value: 'center',
  },
];

const FONT_WEIGHT = [
  {
    label: 'normal',
    value: 'normal',
  },
  {
    label: 'bold',
    value: 'bold',
  },
  {
    label: 'bolder',
    value: 'bolder',
  },
  {
    label: 'lighter',
    value: 'lighter',
  },
];

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export const State = {
  name: 'title',
  value: {},
};

export const listener = {
  receiver(settings) {
    return {};
  },
  report(value, settings) {
    return settings;
  },
};

export const component = (props) => {
  console.log('-----props----', props);
  const { onChange, value } = props;

  const { textStyle } = value;

  const onItemChange = (e) => {
    onChange({ ...value, [e.name]: e.payloadt });
  };

  const onTextChange = (e) => {
    onItemChange({
      name: 'text',
      payloadt: e.target.value,
    });
  };

  const onSubTextChange = (e) => {
    onItemChange({
      name: 'subtext',
      payloadt: e.target.value,
    });
  };

  const onLeftChange = (e) => {
    onItemChange({
      name: 'left',
      payloadt: e,
    });
  };

  const onTextStyleChange = (e, key) => {
    // debugger
    onItemChange({
      name: 'textStyle',
      payloadt: { ...textStyle, [key]: e },
    });
  };

  return (
    <div>
      <p>图表标题</p>
      <div>
        <label>标题</label>
        <Input onChange={onTextChange} value={value.text} />
      </div>
      <div>
        <label>标题样式</label>
        <div>
          <label>标题颜色</label>
          <ColorPicker
            format='hex'
            value={textStyle.color}
            onChangeComplete={(e) =>
              onTextStyleChange(e.toHexString(), 'color')
            }
          />
        </div>
        <div>
          <label>字体大小</label>
          <InputNumber
            value={textStyle.fontSize}
            onChange={(e) => onTextStyleChange(e, 'fontSize')}
          />
        </div>
        <div>
          <label>字体粗细</label>
          <Select
            options={FONT_WEIGHT}
            value={textStyle.fontWeight}
            onChange={(e) => onTextStyleChange(e, 'fontWeight')}
          />
        </div>
      </div>
      <div>
        <label>副标题</label>
        <Input onChange={onSubTextChange} value={value.subtext} />
      </div>
      <div>
        <label>位置</label>
        <Select
          style={{ width: '100%' }}
          onChange={onLeftChange}
          options={LEFT_OPTIONS}
          value={value.left}
        />
      </div>
    </div>
  );
};
