import type { EChartsOption } from 'echarts';
import type { BarChartConfig } from '../types';
import type { ChartMeta } from './type';
import {
  buildCartesianAxes,
  buildCartesianGrid,
  buildLabelOption,
  buildLegendOption,
  buildTitleOption,
  buildTooltipOption,
} from './builders';
import type { SettingBuildContext } from './builders';

export const defaultConfig: BarChartConfig = {
  version: 1,
  type: 'bar',
  data: {
    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    series: [
      { name: '线上', data: [120, 200, 150, 80, 70, 110, 130] },
      { name: '线下', data: [60, 90, 80, 40, 50, 70, 90] },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '每周销量',
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
      orient: 'horizontal',
      left: 'center',
    },
    label: {
      show: false,
      position: 'top',
      formatter: '{c}',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}: {c}',
    },
    xAxis: {
      show: true,
      name: '星期',
      nameLocation: 'end',
      labelRotate: 0,
    },
    yAxis: {
      show: true,
      name: '销量',
      showSplitLine: true,
    },
    series: {
      barWidth: 16,
      borderRadius: 4,
      stack: false,
    },
  },
};

export const buildOption = (config: BarChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 标题与图例自上而下排布，柱状图图例随标题下移
  const context: SettingBuildContext = { type: 'bar', settings, legendBelowTitle: true };

  return {
    title: buildTitleOption(title),
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    grid: buildCartesianGrid(context, xAxis),
    ...buildCartesianAxes({ xAxis, yAxis, categories: data.categories }),
    series: data.series.map((item) => ({
      name: item.name,
      type: 'bar',
      data: item.data,
      barWidth: series.barWidth,
      stack: series.stack ? 'total' : undefined,
      itemStyle: {
        borderRadius: series.borderRadius,
      },
      label: buildLabelOption(label),
    })),
  };
};

export const barMeta: ChartMeta<'bar'> = {
  type: 'bar',
  name: '柱状图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'xAxis', 'yAxis', 'series', 'label', 'tooltip'],
  buildOption,
};
