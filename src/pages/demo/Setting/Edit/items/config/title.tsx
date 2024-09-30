import { Input, Select } from 'antd';
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

  return (
    <div>
      <p>图表标题</p>
      <div>
        <label>标题</label>
        <Input onChange={onTextChange} value={value.text} />
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
