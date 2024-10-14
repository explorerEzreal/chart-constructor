import { EChartsOption } from 'echarts';
import { get, set } from 'lodash';
import { TITLE_LEFT_OPTIONS, TITLE_FONT_WEIGHT } from '../settings/base';
/** */
import { ConfigurationType } from './type';

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
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
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
    setttings: {
      leftOptions: TITLE_LEFT_OPTIONS,
      fontWeightOptions: TITLE_FONT_WEIGHT,
    },
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: unknown, options: EChartsOption) => {
      const newOptions = { ...options };
      set(newOptions, 'title', value);
      return newOptions;
    },
    transform: (options: EChartsOption) => {
      return { ...options.title };
    },
  },
  label: {
    title: '数值标签',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: unknown, options: EChartsOption) => {
      return options;
    },
    transform: (options: EChartsOption) => {
      return {};
    },
  },
  toolTip: {
    title: '提示',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: unknown, options: EChartsOption) => {
      return options;
    },
    transform: (options: EChartsOption) => {
      return {};
    },
  },
};
