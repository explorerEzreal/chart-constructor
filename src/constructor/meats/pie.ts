import { EChartsOption } from 'echarts';
import { cloneDeep, set } from 'lodash';
import { TITLE_LEFT_OPTIONS, TITLE_FONT_WEIGHT, TOOLTIP_TRIGGER_TYPE, TOOLTIP_TRIGGER_ON_TYPE } from '../settings/base';
/** */
import { ConfigurationType, ValueType } from './type';

export const name = '饼图';
export const type = 'pie';

export const option: EChartsOption = {
  title: {
    show: true,
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
    textStyle: {
      color: '#c91818',
      fontWeight: 'bolder',
      fontSize: 18,
      textBorderColor: '#333',
      textBorderType: 'solid',
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
    triggerOn: 'mousemove|click',
    backgroundColor: '#fff',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['50%'],
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      itemStyle: {},
    },
  ],
};

export const defaultSettings = {
  title: {},
  label: {},
};

export const configurations: ConfigurationType = {
  title: {
    title: '图表标题',
    // fields: ['title'],
    settings: {
      leftOptions: TITLE_LEFT_OPTIONS,
      fontWeightOptions: TITLE_FONT_WEIGHT,
    },
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: ValueType['title'], options: EChartsOption) => {
      const newOptions = { ...options };
      set(newOptions, 'title', value);
      return newOptions;
    },
    transform: (itemOptions) => {
      return itemOptions.title as ValueType['title'];
    },
  },
  pieSeries: {
    title: '饼图配置',
    fields: ['series'],
    settings: {
      leftOptions: TITLE_LEFT_OPTIONS,
      fontWeightOptions: TITLE_FONT_WEIGHT,
    },
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: ValueType['pieSeries'], options: EChartsOption) => {
      const { radius, itemStyle } = value;
      const newOptions = cloneDeep({ ...options });
      const newR = (radius as number[]).map((i) => i + '%');
      set(newOptions, 'series[0].radius', newR);
      set(newOptions, 'series[0].itemStyle', itemStyle);

      return newOptions;
    },
    transform: (itemOptions) => {
      const { radius, itemStyle } = itemOptions.series[0];
      const type = radius.length > 1 ? 'ring' : 'common';
      const r = radius.map((i: string) => parseFloat(i.replace('%', '')));

      return { itemStyle, type, radius: r } as ValueType['pieSeries'];
    },
  },
  label: {
    title: '数值标签',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: ValueType['label'], options: EChartsOption) => {
      return options;
    },
    transform: (itemOptions) => {
      return itemOptions.label as ValueType['label'];
    },
  },
  tooltip: {
    title: '提示',
    settings: {
      triggerTypeOptions: TOOLTIP_TRIGGER_TYPE,
      triggerOnOptions: TOOLTIP_TRIGGER_ON_TYPE,
    },
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: ValueType['tooltip'], options: EChartsOption) => {
      const newOptions = { ...options };
      set(newOptions, 'tooltip', value);
      return newOptions;
    },
    transform: (itemOptions) => {
      return itemOptions.tooltip as ValueType['tooltip'];
    },
  },
};
