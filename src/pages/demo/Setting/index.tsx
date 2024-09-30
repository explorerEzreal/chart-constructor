import React, { useEffect, useRef } from 'react';
import { Flex, Tag } from 'antd';
import * as metas from '@/chart-constructor/metas';

import { Header } from '../components/Headerlayout';
import { useOverviewContext } from '../context';
import { useInit } from '../Hooks/useInit';
import Edit from './Edit';

type SettingProps = {
  [key: string]: string;
  onChange: (v: any) => void;
  options: any;
};
export const Settings: React.FC<SettingProps> = (props) => {
  const { options } = props;
  const { state, dispatch } = useOverviewContext();
  const { type } = state;

  const configurations = metas[type].configurations;

  const optionsRef = useRef();
  optionsRef.current = options;

  const onChange = (e) => {
    const updateFun = configurations[e.key].updateOptions;
    const currentOptions = updateFun(e.e, optionsRef.current);
    props.onChange(currentOptions);
  };

  const { itemsList: items } = useInit(type, onChange);

  useEffect(() => {
    type && props.onChange(metas[type]['option']);
  }, [type]);

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
