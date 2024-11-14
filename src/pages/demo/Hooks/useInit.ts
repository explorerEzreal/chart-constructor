import * as meats from '@/constructor/meats';
import React, { useEffect, useRef, useState } from 'react';
import { useLatest } from 'ahooks';
import { cloneDeep, uniq } from 'lodash';
import { EChartsOption } from 'echarts';
/** */
import Stack from '@/shard/utils/stack';
import items, { EventMap, ItemKey } from '../Setting/Edit/items';
import { ChartType } from '../type';
import {
  ConfigurationType,
  UniqueConfigType,
  SettingsType,
  ConfigurationKeys,
  ValueType,
} from '@/constructor/meats/type';

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

type StackItem = {
  options: EChartsOption;
  value: ValueType[keyof ValueType];
  field: ConfigurationKeys;
};

export const useInit = (type: ChartType) => {
  const configurations: ConfigurationType = meats[type].configurations;
  const initOptions: EChartsOption = meats[type].option;

  const [itemsList, setItemsList] = useState<Item<ConfigurationKeys>[]>([]);
  const latestItemsListRef = useLatest(itemsList);
  const [options, setOptions] = useState<EChartsOption>(initOptions);
  const latestOptionsRef = useLatest(options);
  const [backDisabled, setBackDisabled] = useState<boolean>(true);
  const stackRef = useRef<Stack<StackItem>>(new Stack<StackItem>());

  // const backDisabled = stackRef.current.isEmpty();

  const onBack = () => {
    const {
      options: currentOptions,
      value,
      field,
    } = stackRef.current.peek() as StackItem;
    console.log('-----stackRef-----', stackRef.current);
    const index = latestItemsListRef.current.findIndex(
      (item) => item.key === field
    );
    const list = cloneDeep(latestItemsListRef.current);
    list[index].value = value;
    // debugger

    stackRef.current.pop();
    setItemsList(list);
    setOptions(currentOptions);
    setBackDisabled(stackRef.current.isEmpty());
  };

  const onItemChange = (e: EventMap[ItemKey]) => {
    const { field, payload } = e;
    const index = latestItemsListRef.current.findIndex(
      (item) => item.key === field
    );
    const list = cloneDeep(latestItemsListRef.current);
    list[index].value = payload;
    const updateFn = configurations[field].updateOptions;
    const newOptions = updateFn(payload, latestOptionsRef.current);
    const preValue = {
      options: latestOptionsRef.current,
      value: latestItemsListRef.current[index].value,
      field,
    };

    stackRef.current.push(preValue);
    setItemsList(list);
    setOptions(newOptions);
    setBackDisabled(false)
  };

  useEffect(() => {
    const list = Object.entries(configurations).map(([key, config]) => {
      const configKey = key as ConfigurationKeys;
      const { transform, fields = [configKey] } = config;
      const itemsOptions = uniq(fields.filter((i) => !!i)).reduce(
        (acc, item) => ({ ...acc, [item]: initOptions[item] || {} }),
        {}
      );
      const initValue = transform(itemsOptions, initOptions);

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

  return { itemsList, options, onBack, backDisabled };
};
