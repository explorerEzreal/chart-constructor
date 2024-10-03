import * as metas from '@/chart-constructor/metas';
import items, { EventMap, ItemKey } from '../Setting/Edit/items';
import { useEffect, useState } from 'react';
import { useLatest } from 'ahooks';
import { cloneDeep, merge } from 'lodash';
/** */
import { EChartsOption } from 'echarts';
import { ChartType, Item } from '../type';
import { ConfigurationType } from '@/chart-constructor/metas/type';

export const useInit = (type: ChartType) => {
  const configurations: ConfigurationType = metas[type].configurations;
  const initOptions: EChartsOption = metas[type].option;

  const [itemsList, setItemsList] = useState<Item[]>([]);
  const latestItemsListRef = useLatest(itemsList);
  const [options, setOptions] = useState<EChartsOption>(initOptions);
  const latestOptionsRef = useLatest(options);

  const onItemChange = (e: EventMap[ItemKey]) => {
    const { field, name, payload } = e;
    const index = latestItemsListRef.current.findIndex(
      (item) => item.key === field
    );
    const list = cloneDeep(latestItemsListRef.current);
    const currentValue = merge(list[index].value, { [name]: payload });
    list[index].value = currentValue;
    const updateFn = configurations[field].updateOptions;
    const newOptions = updateFn(currentValue, latestOptionsRef.current);

    setItemsList(list);
    setOptions(newOptions);
  };

  useEffect(() => {
    const list: Item[] = Object.entries(configurations).map(([key, config]) => {
      const configuKey = key as keyof ConfigurationType;
      return {
        key,
        title: config.title,
        value: {
          ...(configurations[configuKey]?.defaultValue || {}),
        },
        uniqueConfig: configurations[configuKey].uniqueConfig,
        component: items[configuKey].component,
        onChange: onItemChange,
      };
    });
    setItemsList(list);
  }, []);

  return { itemsList, options };
};
