import type { EChartsOption } from 'echarts';
import type { PieChartConfig } from '../types';
import type { ChartMeta } from './type';
import {
  buildLabelOption,
  buildLegendOption,
  buildTitleOption,
  buildTooltipOption,
} from './builders';
import type { SettingBuildContext } from './builders';

export const defaultConfig: PieChartConfig = {
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

export const buildOption = (config: PieChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip } = settings;
  // 饼图图例贴顶排布，不参与标题占位计算
  const context: SettingBuildContext = { type: 'pie', settings, legendBelowTitle: false };

  return {
    title: buildTitleOption(title),
    // 饼图无触发方式配置项，由提示框片段按配置结构回落为数据项触发
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    series: [
      {
        name: data.seriesName,
        type: 'pie',
        radius: '60%',
        data: data.list,
        label: buildLabelOption(label),
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

export const pieMeta: ChartMeta<'pie'> = {
  type: 'pie',
  name: '饼图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'label', 'tooltip'],
  buildOption,
};
