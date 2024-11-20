import React from "react";
import { Button, Flex, Tag } from "antd";

import { Header } from "../components/Headerlayout";
import Edit from "./Edit";
import { Item } from "../Hooks/useInit";

type SettingProps = {
  items: Item[];
  onBack: () => void;
  onReset: () => void;
  backDisabled: boolean;
};

type HeaderBtns = {
  key: string;
  label: string;
  type: "primary" | "link" | "text" | "default" | "dashed";
  onClick: () => void;
  disabled?: boolean;
};

export const Settings: React.FC<SettingProps> = (props) => {
  const { items, onBack, backDisabled, onReset } = props;

  const BTN_CONFIG: HeaderBtns[] = [
    {
      key: "back",
      label: "回到上一步",
      type: "primary",
      onClick: onBack,
      disabled: backDisabled,
    },
    {
      key: "reset",
      label: "重置",
      type: "primary",
      onClick: onReset,
    },
  ];

  const HeaderBtns = () => {
    return (
      <Flex gap={8}>
        {/* {items.map((item) => {
          return <Tag key={item.key}>{item.title}</Tag>;
        })} */}
        {/* <Button disabled={backDisabled} onClick={onBack} type="primary">
          回到上一步
        </Button> */}
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
