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

export type Event = {
  field: 'title';
  name: string;
  payload: unknown;
};

export const State = {
  name: 'title',
  value: {},
};

export const component = (props) => {
  // console.log('-----props----', props);
  const { onChange, value } = props;

  const { textStyle } = value;

  const onItemChange = (e: { name: string; payload: unknown }) => {
    onChange({
      ...e,
      field: 'title',
    });
  };

  const onTextChange = (e) => {
    onItemChange({
      name: 'text',
      payload: e.target.value,
    });
  };

  const onSubTextChange = (e) => {
    onItemChange({
      name: 'subtext',
      payload: e.target.value,
    });
  };

  const onLeftChange = (e) => {
    onItemChange({
      name: 'left',
      payload: e,
    });
  };

  const onTextStyleChange = (e, key) => {
    // debugger
    onItemChange({
      name: 'textStyle',
      payload: { ...textStyle, [key]: e },
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
