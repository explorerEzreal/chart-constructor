import * as metas from '@/chart-constructor/metas';
import * as items from '../Setting/Edit/items';
import React, { useEffect, useState } from 'react';

export const useInit: React.FC<{ type: 'pie' }> = (type) => {
  const configurations = metas[type].configurations;
  const [settings, setSettings] = useState(metas[type].defaultSettings);
  const [itemsList, setItemsList] = useState([]);

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
      };
    });
    setItemsList(list);
  }, []);

  return { itemsList };
};
