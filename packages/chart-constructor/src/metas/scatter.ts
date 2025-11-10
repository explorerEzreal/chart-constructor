import type { EChartsOption } from 'echarts';
import type { ScatterChartConfig } from '../types';
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

/** 散点图默认配置项 */
export const defaultConfig: ScatterChartConfig = {
  version: 1,
  type: 'scatter',
  data: {
    series: [
      {
        name: '样本A',
        data: [
          [10, 8.04],
          [8, 6.95],
          [13, 7.58],
          [9, 8.81],
          [11, 8.33],
          [14, 9.96],
          [6, 7.24],
          [4, 4.26],
          [12, 10.84],
          [7, 4.82],
          [5, 5.68],
        ],
      },
      {
        name: '样本B',
        data: [
          [10, 9.14],
          [8, 8.14],
          [13, 8.74],
          [9, 8.77],
          [11, 9.26],
          [14, 8.1],
          [6, 6.13],
          [4, 3.1],
          [12, 9.13],
          [7, 7.26],
          [5, 4.74],
        ],
      },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '变量分布',
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
      trigger: 'item',
      formatter: '{a}: ({c})',
    },
    xAxis: {
      show: true,
      name: 'X 轴',
      nameLocation: 'end',
      labelRotate: 0,
    },
    yAxis: {
      show: true,
      name: 'Y 轴',
      showSplitLine: true,
    },
    series: {
      symbolSize: 12,
      symbol: 'circle',
    },
  },
};

/** 由配置项派生散点图 ECharts option */
export const buildOption = (config: ScatterChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 散点图 X 轴为数值轴，坐标由数据点自带
  const context: SettingBuildContext = { type: 'scatter', settings, legendBelowTitle: true };

  return {
    title: buildTitleOption(title),
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    grid: buildCartesianGrid(context, xAxis),
    ...buildCartesianAxes({ xAxis, yAxis, xAxisType: 'value' }),
    series: data.series.map((item) => ({
      name: item.name,
      type: 'scatter',
      data: item.data,
      symbolSize: series.symbolSize,
      symbol: series.symbol,
      label: buildLabelOption(label),
    })),
  };
};

/** 散点图元数据 */
export const scatterMeta: ChartMeta<'scatter'> = {
  type: 'scatter',
  name: '散点图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'xAxis', 'yAxis', 'series', 'label', 'tooltip'],
  buildOption,
};
