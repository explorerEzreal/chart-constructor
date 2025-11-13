import type { EChartsOption } from 'echarts';
import type { LineChartConfig } from '../types';
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

export const defaultConfig: LineChartConfig = {
  version: 1,
  type: 'line',
  data: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      { name: '访问量', data: [820, 932, 901, 934, 1290, 1330] },
      { name: '下单量', data: [420, 532, 501, 634, 890, 1030] },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '月度趋势',
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
      name: '月份',
      nameLocation: 'end',
      labelRotate: 0,
    },
    yAxis: {
      show: true,
      name: '数量',
      showSplitLine: true,
    },
    series: {
      lineWidth: 2,
      smooth: true,
      area: false,
      showSymbol: true,
      symbolSize: 6,
    },
  },
};

export const buildOption = (config: LineChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 标题与图例自上而下排布，图例随标题下移
  const context: SettingBuildContext = { type: 'line', settings, legendBelowTitle: true };

  return {
    title: buildTitleOption(title),
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    grid: buildCartesianGrid(context, xAxis),
    ...buildCartesianAxes({ xAxis, yAxis, categories: data.categories }),
    series: data.series.map((item) => ({
      name: item.name,
      type: 'line',
      data: item.data,
      smooth: series.smooth,
      showSymbol: series.showSymbol,
      symbolSize: series.symbolSize,
      lineStyle: {
        width: series.lineWidth,
      },
      areaStyle: series.area ? {} : undefined,
      label: buildLabelOption(label),
    })),
  };
};

export const lineMeta: ChartMeta<'line'> = {
  type: 'line',
  name: '折线图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'xAxis', 'yAxis', 'series', 'label', 'tooltip'],
  buildOption,
};
