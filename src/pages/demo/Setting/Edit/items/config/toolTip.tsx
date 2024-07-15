import React from 'react';

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export const State = {
  name: 'label',
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
  return <div>toolTip</div>;
};
