import { EChartsOption } from 'echarts';
import { set } from 'lodash';
import {
  TITLE_LEFT_OPTIONS,
  TITLE_FONT_WEIGHT,
  TOOLTIP_TRIGGER_TYPE,
  TOOLTIP_TRIGGER_ON_TYPE,
} from '../settings/base';
/** */
import { ConfigurationType, ValueType } from './type';

export const name = '折线图';
export const type = 'line';

export const option: EChartsOption = {
  title: {
    text: 'Stacked Area Chart',
    show: false,
    subtext: 'Fake Data',
    left: 'left',
    textStyle: {
      color: '#c91818',
      fontWeight: 'bolder',
      fontSize: 18,
      textBorderColor: '#333',
      textBorderType: 'solid',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
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
