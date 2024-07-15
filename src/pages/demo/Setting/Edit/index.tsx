import React, { createElement } from 'react';

import './index.less';

type EditProps = {
  [key: string]: string;
};

const Edit: React.FC<EditProps> = (props) => {
  const { items } = props;

  const onItemChange = () => {};

  return (
    <div className='edit_wrapper'>
      {items.map((item) => {
        return (
          <ChartSettingItem
            key={item.key}
            item={item}
            onChange={onItemChange}
          />
        );
      })}
    </div>
  );
};

function ChartSettingItem(props) {
  const { item, onChange } = props;
  const { value, uniqueConfig, component } = item;
  return createElement(component, { value, uniqueConfig, onChange });
}

export default Edit;
