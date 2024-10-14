import * as metas from '@/chart-constructor/metas';
import items, { EventMap, ItemKey } from '../Setting/Edit/items';
import React, { useEffect, useState } from 'react';
import { useLatest } from 'ahooks';
import { cloneDeep } from 'lodash';
/** */
import { EChartsOption } from 'echarts';
import { ChartType } from '../type';
import {
  ConfigurationType,
  UniqueConfigType,
  SettingsType,
  ConfigurationKeys,
  ValueType,
} from '@/chart-constructor/metas/type';

export type Item<K extends ConfigurationKeys = ConfigurationKeys> = {
  key: string;
  title: string;
  value: ValueType[K];
  uniqueConfig?: UniqueConfigType[K];
  settings?: SettingsType[K];
  component: React.FC<any>;
  onChange: (e: EventMap[ItemKey]) => void;
};

export type ItemProps<K extends ConfigurationKeys = ConfigurationKeys> = {
  value: ValueType[K];
  uniqueConfig?: UniqueConfigType[K];
  settings?: SettingsType[K];
  onChange: (e: EventMap[K]) => void;
};

export const useInit = (type: ChartType) => {
  const configurations: ConfigurationType = metas[type].configurations;
  const initOptions: EChartsOption = metas[type].option;

  const [itemsList, setItemsList] = useState<Item<ConfigurationKeys>[]>([]);
  const latestItemsListRef = useLatest(itemsList);
  const [options, setOptions] = useState<EChartsOption>(initOptions);
  const latestOptionsRef = useLatest(options);

  const onItemChange = (e: EventMap[ItemKey]) => {
    const { field, payload } = e;
    const index = latestItemsListRef.current.findIndex(
      (item) => item.key === field
    );
    const list = cloneDeep(latestItemsListRef.current);
    list[index].value = payload;
    const updateFn = configurations[field].updateOptions;
    const newOptions = updateFn(payload, latestOptionsRef.current);

    setItemsList(list);
    setOptions(newOptions);
  };

  useEffect(() => {
    const list = Object.entries(configurations).map(([key, config]) => {
      const configuKey = key as keyof ConfigurationType;

      const transform = configurations[configuKey].transform;
      const initValue = transform(initOptions);
      return {
        key,
        title: config.title,
        value: {
          ...initValue,
          ...(configurations[configuKey]?.defaultValue || {}),
        },
        uniqueConfig: configurations[configuKey].uniqueConfig,
        settings: configurations[configuKey].setttings,
        component: items[configuKey].component,
        onChange: onItemChange,
      };
    });
    setItemsList(list);
  }, []);

  return { itemsList, options };
};
