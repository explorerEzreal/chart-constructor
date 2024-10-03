import React, { createElement } from 'react';
import { Item } from '@pages/demo/type';

import './index.less';

type EditProps = {
  items: Item[];
};

const Edit: React.FC<EditProps> = (props) => {
  const { items } = props;

  return (
    <div className='edit_wrapper'>
      {items.map((item) => {
        return <ChartSettingItem key={item.key} item={item} />;
      })}
    </div>
  );
};

function ChartSettingItem(props: { item: Item }) {
  const { item } = props;
  const { value, uniqueConfig, component, onChange } = item;
  return createElement(component, { value, uniqueConfig, onChange });
}

export default Edit;
