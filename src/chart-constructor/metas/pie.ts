import { EChartsOption } from 'echarts';
// import { set } from 'lodash';
import { set } from 'lodash';

export const name = '饼图';
export const type = 'pie';

export const option: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
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

export const configurations = {
  title: {
    title: '标题',
    uniqueConfig: {},
    defaultValue: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    updateOptions: (value, options) => {
      console.log('-----updateOptions----', options);
      console.log('-----value----', value);

      const newOptions = { ...options };

      set(newOptions, 'title', value);

      // const {}
      console.log('-----newOptions----', newOptions);



      return newOptions;
    },
  },
  label: {
    title: '数值标签',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value, options) => {
      return options;
    },
  },
  toolTip: {
    title: '提示',
    uniqueConfig: {},
    defaultValue: {},
    updateOptions: (value, options) => {
      return options;
    },
  },
};
