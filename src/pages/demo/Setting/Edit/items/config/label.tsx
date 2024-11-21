import { ItemProps } from '@pages/demo/Hooks/useInit';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const component = (props: any) => {
  return <div>label</div>;
};
