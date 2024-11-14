import React from 'react';
import { Button, Flex, Tag } from 'antd';

import { Header } from '../components/Headerlayout';
import Edit from './Edit';
import { Item } from '../Hooks/useInit';

type SettingProps = {
  items: Item[];
  onBack: () => void;
  backDisabled: boolean;
};
export const Settings: React.FC<SettingProps> = (props) => {
  const { items, onBack ,backDisabled} = props;

  const HeaderBtns = () => {
    return (
      <Flex gap={8}>
        {/* {items.map((item) => {
          return <Tag key={item.key}>{item.title}</Tag>;
        })} */}
        <Button disabled={backDisabled} onClick={onBack} type='primary'>
          回到上一步
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <Header>
        <HeaderBtns />
      </Header>
      <Edit items={items} />
    </>
  );
};
