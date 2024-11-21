import React from 'react';
import { Input, Select, ColorPicker, InputNumber, Switch } from 'antd';
import { ItemProps } from '../../../../Hooks/useInit';
import '../item.less'

export type FieldKey = 'title';

export type Event = {
  field: 'title';
  payload: ItemProps<'title'>['value'];
};



export const component: React.FC<ItemProps<FieldKey>> = (props) => {
  const { onChange, value, settings } = props;
  const { textStyle } = value;

  const onItemChange = (payload: Event['payload']) => {
    onChange({
      payload,
      field: 'title',
    });
  };

  const onConfigItemChange = (e: string | boolean, key: string) => {
    const payload = {
      ...value,
      [key]: e,
    };
    onItemChange(payload);
  };

  const onTextStyleChange = (e: string | number | null, key: string) => {
    const payload = {
      ...value,
      textStyle: {
        ...textStyle,
        [key]: e,
      },
    };
    onItemChange(payload);
  };

  return (
    <div>
      <div className='item'>
      <label className='item_label'>标题显示</label>
      <Switch
        value={value.show}
        onChange={(e) => onConfigItemChange(e, 'show')}
      />
      </div>
      <div className='item'>
        <label className='item_label'>标题名称</label>
        <Input
           className='item_view'
          onChange={(e) => onConfigItemChange(e.target.value, 'text')}
          value={value.text}
        />
      </div>
      <div >
        {/* <label>标题样式</label> */}
        <div className='item'>
          <label className='item_label'>标题颜色</label>
          <ColorPicker
             className='item_view'
            format='hex'
            value={textStyle.color}
            onChangeComplete={(e) =>
              onTextStyleChange(e.toHexString(), 'color')
            }
          />
        </div>
        <div className='item'>
          <label className='item_label'>字体大小</label>
          <InputNumber
            className='item_view'
            value={textStyle.fontSize}
            onChange={(e) => onTextStyleChange(e, 'fontSize')}
          />
        </div>
        <div className='item'>
          <label className='item_label'>字体粗细</label>
          <Select
            className='item_view'
            options={settings?.fontWeightOptions}
            value={textStyle.fontWeight}
            onChange={(e) => onTextStyleChange(e, 'fontWeight')}
          />
        </div>
      </div>
      <div className='item'>
        <label className='item_label'>副标题</label>
        <Input
          className='item_view'
          onChange={(e) => onConfigItemChange(e.target.value, 'subtext')}
          value={value.subtext}
        />
      </div>
      <div className='item'>
        <label className='item_label'>位置</label>
        <Select
          className='item_view'
          onChange={(e) => onConfigItemChange(e, 'left')}
          options={settings?.leftOptions}
          value={value.left}
        />
      </div>
    </div>
  );
};
