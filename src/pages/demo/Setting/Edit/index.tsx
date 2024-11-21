import React, { createElement } from 'react';
// import { Item } from '@pages/demo/type';
import { CaretRightOutlined } from '@ant-design/icons';

import { Item } from '../../Hooks/useInit';

import './index.less';
import { Collapse, theme } from 'antd';

type EditProps = {
  items: Item[];
};

const Edit: React.FC<EditProps> = (props) => {
  const { items } = props;

  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const itemList = items.map((item) => {
    return {
      key: item.key,
      // label: item.title,
      label: <span style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</span>,
      children: <ChartSettingItem key={item.key} item={item} />,
      style: panelStyle,
    };
  });

  return (
    <div className='edit_wrapper'>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={itemList}
      />
    </div>
  );
};

function ChartSettingItem(props: { item: Item }) {
  const { item } = props;
  const { value, uniqueConfig, component, onChange, settings } = item;

  return createElement(component, { value, uniqueConfig, settings, onChange });
}

export default Edit;
