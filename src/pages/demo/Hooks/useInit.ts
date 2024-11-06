import * as meats from '@constructor/meats';
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
} from '@constructor/meats/type';

export type Item<K extends ConfigurationKeys = ConfigurationKeys> = {
  key: string;
  title: string;
  value: ValueType[K];
  uniqueConfig?: UniqueConfigType[K];
  settings?: SettingsType[K];
  component: React.FC<ValueType[K]>;
  onChange: (e: EventMap[ItemKey]) => void;
};

export type ItemProps<K extends ConfigurationKeys = ConfigurationKeys> = {
  value: ValueType[K];
  uniqueConfig?: UniqueConfigType[K];
  settings?: SettingsType[K];
  onChange: (e: EventMap[K]) => void;
};

export const useInit = (type: ChartType) => {
  const configurations: ConfigurationType = meats[type].configurations;
  const initOptions: EChartsOption = meats[type].option;

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
      const configKey = key as ConfigurationKeys;
      const initValue = configurations[configKey].transform(
        initOptions[configKey] || {}, // TODO: 待调整
        initOptions
      );

      return {
        key,
        title: config.title,
        value: {
          ...initValue,
          ...(configurations[configKey]?.defaultValue || {}),
        },
        uniqueConfig: configurations[configKey].uniqueConfig,
        settings: configurations[configKey].settings,
        component: items[configKey].component,
        onChange: onItemChange,
      };
    });
    setItemsList(list);
  }, []);

  return { itemsList, options };
};
