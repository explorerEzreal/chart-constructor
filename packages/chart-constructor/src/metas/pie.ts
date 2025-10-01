import type { EChartsOption } from 'echarts';
import type { ChartConfig } from '../types';
import type { ChartMeta } from './type';

/** 饼图默认配置项 */
export const defaultConfig: ChartConfig = {
  version: 1,
  type: 'pie',
  data: {
    seriesName: '访问来源',
    list: [
      { name: '搜索引擎', value: 1048 },
      { name: '直接访问', value: 735 },
      { name: '邮件营销', value: 580 },
      { name: '联盟广告', value: 484 },
      { name: '视频广告', value: 300 },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '网站访问来源',
      subtext: '示例数据',
      left: 'center',
      textStyle: {
        color: '#333333',
        fontSize: 18,
        fontWeight: 'bolder',
      },
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
    },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b}: {d}%',
    },
    tooltip: {
      show: true,
      formatter: '{b}: {c} ({d}%)',
    },
  },
};

/** 由配置项派生饼图 ECharts option */
export const buildOption = (config: ChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip } = settings;

  return {
    title: title.show
      ? {
          text: title.text,
          subtext: title.subtext,
          left: title.left,
          textStyle: {
            color: title.textStyle.color,
            fontSize: title.textStyle.fontSize,
            fontWeight: title.textStyle.fontWeight,
          },
        }
      : { show: false },
    tooltip: tooltip.show
      ? {
          trigger: 'item',
          formatter: tooltip.formatter,
        }
      : { show: false },
    legend: legend.show
      ? {
          orient: legend.orient,
          left: legend.left,
        }
      : { show: false },
    series: [
      {
        name: data.seriesName,
        type: 'pie',
        radius: '60%',
        data: data.list,
        label: {
          show: label.show,
          position: label.position,
          formatter: label.formatter,
        },
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
};

/** 饼图元数据 */
export const pieMeta: ChartMeta = {
  type: 'pie',
  name: '饼图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'label', 'tooltip'],
  buildOption,
};
