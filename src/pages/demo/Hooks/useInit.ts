import * as metas from '@/chart-constructor/metas';
import * as items from '../Setting/Edit/items';
import { useEffect, useState } from 'react';
import { useLatest } from 'ahooks';
import { cloneDeep } from 'lodash';

export const useInit = (
  type: 'pie',
  onChange: (val: any) => void,
) => {
  const configurations = metas[type].configurations;
  const [settings, setSettings] = useState(metas[type].defaultSettings);
  const [itemsList, setItemsList] = useState([]);
  const latestCountRef = useLatest(itemsList);

  const onItemChange = (e, key) => {
    const index = latestCountRef.current.findIndex((item) => item.key === key);
    const list = cloneDeep(latestCountRef.current);
    list[index].value = e;
    setItemsList(list);

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
