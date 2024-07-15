import React from 'react';
import { Flex, Tag } from 'antd';
import { Header } from '../components/Headerlayout';
import { useOverviewContext } from '../context';
import { useInit } from '../Hooks/useInit';
import Edit from './Edit';

type SettingProps = {
  [key: string]: string;
};
export const Settings: React.FC<SettingProps> = () => {
  const { state, dispatch } = useOverviewContext();
  const { type } = state;
  const { itemsList: items } = useInit(type);

  console.log('----items-----', items);

  const HeaderBtns = () => {
    return (
      <Flex gap={8}>
        {items.map((item) => {
          return <Tag key={item.key}>{item.title}</Tag>;
        })}
      </Flex>
    );
  };

  return (
    <div>
      <Header>
        <HeaderBtns />
      </Header>
      <Edit items={items} />
    </div>
  );
};
