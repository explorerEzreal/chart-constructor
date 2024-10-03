import React, { useEffect, useRef } from 'react';
import { Flex, Tag } from 'antd';
import * as metas from '@/chart-constructor/metas';

import { Header } from '../components/Headerlayout';
import { useOverviewContext } from '../context';
import { useInit } from '../Hooks/useInit';
import Edit from './Edit';
import { Item } from '../type';
import { EChartsOption } from 'echarts';

type SettingProps = {
  items: Item[];
};
export const Settings: React.FC<SettingProps> = (props) => {
  const { items } = props;

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
