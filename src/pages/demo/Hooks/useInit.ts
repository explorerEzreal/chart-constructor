import * as metas from '@/chart-constructor/metas';
import * as items from '../Setting/Edit/items';
import { useEffect, useState } from 'react';

export const useInit = (
  type: 'pie',
  onChange: (val: any) => void,
  options: any
) => {
  const configurations = metas[type].configurations;
  const [settings, setSettings] = useState(metas[type].defaultSettings);
  const [itemsList, setItemsList] = useState([]);

  const onItemChange = (e, key) => {
    console.log('----onItemChange----', e, key);
    
    // const updateFun = configurations[key].updateOptions;

    // const currentOptions = updateFun(e, options);
    // console.log('-----currentOptions---', currentOptions);
    onChange({ e, key });
  };

  useEffect(() => {
    const list = Object.entries(configurations).map(([key, config]) => {
      return {
        key,
        title: config.title,
        value: {
          ...items[key].listener.receiver(settings),
          ...configurations[key].defaultValue,
        },
        uniqueConfig: configurations[key].uniqueConfig,
        component: items[key].component,
        onChange: (e) => onItemChange(e, key),
      };
    });
    setItemsList(list);
  }, []);

 

  return { itemsList };
};
