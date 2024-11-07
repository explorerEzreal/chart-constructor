import { ItemProps } from '@pages/demo/Hooks/useInit';
import { ColorPicker, Select, Switch } from 'antd';
import React from 'react';

export type FieldKey = 'tooltip';

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export type Event = {
  field: 'tooltip';
  payload: ItemProps<'tooltip'>['value'];
};



export const component: React.FC<ItemProps<FieldKey>> = (props) => {
  const { onChange, value, settings } = props;

  const onItemChange = (payload: Event['payload']) => {
    onChange({
      payload,
      field: 'tooltip',
    });
  };

  const onConfigItemChange = (e: string | boolean, key: string) => {
    const payload = {
      ...value,
      [key]: e,
    };

    onItemChange(payload);
  };

  return (
    <div>
      <div>
        <label htmlFor='show'>显示/隐藏</label>
        <Switch
          id='show'
          value={value.show}
          onChange={(e) => onConfigItemChange(e, 'show')}
        ></Switch>
      </div>

      {value.show && (
        <>
          <div>
            <label htmlFor='triggerType'>触发类型</label>
            <Select
              id='triggerType'
              options={settings?.triggerTypeOptions}
              value={value.trigger}
              onChange={(e) => onConfigItemChange(e, 'trigger')}
            />
          </div>

          <div>
            <label htmlFor='triggerOn'>触发条件</label>
            <Select
              id='triggerOn'
              options={settings?.triggerOnOptions}
              value={value.triggerOn}
              onChange={(e) => onConfigItemChange(e, 'triggerOn')}
            />
          </div>

          <div>
            <label htmlFor='backgroundColor'>背景颜色</label>
            <ColorPicker
              format='hex'
              value={value.backgroundColor}
              onChangeComplete={(e) =>
                onConfigItemChange(e.toHexString(), 'backgroundColor')
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
