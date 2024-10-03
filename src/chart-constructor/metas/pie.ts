import { EChartsOption } from 'echarts';
import { set } from 'lodash';
import { ConfigurationType } from './type';

export const name = '饼图';
export const type = 'pie';

export const option: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
    textStyle: {
      color: '#333',
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
    uniqueConfig: {},
    defaultValue: {
      text: 'Referer of a Website',
      link: '',
      subtext: 'Fake Data',
      left: 'center',
      textStyle: {
        color: '#333',
        fontWeight: 'bolder',
        fontSize: 18,
        textBorderColor: '#333',
        textBorderType: 'solid',
      },
    },
    updateOptions: (value: unknown, options: EChartsOption) => {
      const newOptions = { ...options };
      set(newOptions, 'title', value);
      return newOptions;
    },
  },
  label: {
    title: '数值标签',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: unknown, options: EChartsOption) => {
      return options;
    },
  },
  toolTip: {
    title: '提示',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value: unknown, options: EChartsOption) => {
      return options;
    },
  },
};
