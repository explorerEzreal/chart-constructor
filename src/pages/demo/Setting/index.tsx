import React from 'react';
import { Button, Flex } from 'antd';

import { Header } from '../components/Headerlayout';
import Edit from './Edit';
import { Item } from '../Hooks/useInit';
import useConfirm from '../Hooks/useConfirm';

type SettingProps = {
  items: Item[];
  onBack: () => void;
  onReset: () => void;
  backDisabled: boolean;
};

type HeaderBtns = {
  key: string;
  label: string;
  type: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  onClick: () => void;
  disabled?: boolean;
};

export const Settings: React.FC<SettingProps> = (props) => {
  const { items, onBack, backDisabled, onReset } = props;

  const { handleConfirm: handleReset } = useConfirm(onReset, {
    title: '是否重置',
    content: '重置之后无法撤回',
    okText: '确认',
    cancelText: '取消',
  });

  const BTN_CONFIG: HeaderBtns[] = [
    {
      key: 'back',
      label: '回到上一步',
      type: 'primary',
      onClick: onBack,
      disabled: backDisabled,
    },
    {
      key: 'reset',
      label: '重置',
      type: 'primary',
      onClick: handleReset,
    },
  ];

  const HeaderBtns = () => {
    return (
      <Flex gap={8}>
        {BTN_CONFIG.map(({ key, label, ...rest }) => (
          <Button key={key} {...rest}>
            {label}
          </Button>
        ))}
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
