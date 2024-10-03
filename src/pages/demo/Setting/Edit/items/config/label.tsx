import React from 'react';

export type State = {
  name: string;
  value: {
    [key: string]: string;
  };
};

export type Event = {
  field: 'label';
  name: string;
  payload: unknown;
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
  return <div>label</div>;
};
