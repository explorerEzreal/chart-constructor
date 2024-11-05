import { ItemProps } from '@pages/demo/Hooks/useInit';
import { EChartsOption } from 'echarts';
import React from 'react';

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export type Event = {
  field: 'label';
  payload: ItemProps<'label'>['value'];
};


export const component = (props) => {
  return <div>label</div>;
};
