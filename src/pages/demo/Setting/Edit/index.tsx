import React, { createElement } from 'react';

import './index.less';

type EditProps = {
  [key: string]: any;
};

const Edit: React.FC<EditProps> = (props) => {
  const { items } = props;

  return (
    <div className='edit_wrapper'>
      {items.map((item) => {
        return (
          <ChartSettingItem
            key={item.key}
            item={item}
            onChange={item.onChange}
          />
        );
      })}
    </div>
  );
};

function ChartSettingItem(props) {
  const { item, onChange } = props;
  const { value, uniqueConfig, component } = item;
  console.log('--->>>>>>>>>>>>>item>>>>>>>>>>>>', item);
  return createElement(component, { value, uniqueConfig, onChange });
}

export default Edit;
