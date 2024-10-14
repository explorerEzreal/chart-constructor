import { ItemProps } from '@pages/demo/Hooks/useInit';
import React from 'react';

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export type Event = {
  field: 'toolTip';
  payload: ItemProps<'toolTip'>['value'];
};



export const component = (props) => {
  return <div>toolTip</div>;
};
