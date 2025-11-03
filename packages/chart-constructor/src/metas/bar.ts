import type { EChartsOption } from 'echarts';
import type { BarChartConfig } from '../types';
import type { ChartMeta } from './type';
import {
  buildLabelOption,
  buildLegendOption,
  buildTitleOption,
  buildTooltipOption,
  resolveLegendTop,
} from './builders';
import type { SettingBuildContext } from './builders';

/** 柱状图默认配置项 */
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

/** 图例在标题下方时绘制区再下移，否则按标题是否展示取固定留白 */
const resolveGridTop = (context: SettingBuildContext): number =>
  context.settings.legend.show
    ? resolveLegendTop(context) + 48
    : context.settings.title.show
      ? 64
      : 24;

/** 由配置项派生柱状图 ECharts option */
export const buildOption = (config: BarChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 标题与图例自上而下排布，柱状图图例随标题下移
  const context: SettingBuildContext = { type: 'bar', settings, legendBelowTitle: true };

  return {
    title: buildTitleOption(title),
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    grid: {
      top: resolveGridTop(context),
      left: 48,
      right: 32,
      bottom: 32,
      containLabel: true,
    },
    xAxis: {
      show: xAxis.show,
      type: 'category',
      name: xAxis.name,
      data: data.categories,
      axisLabel: {
        rotate: xAxis.labelRotate,
      },
    },
    yAxis: {
      show: yAxis.show,
      type: 'value',
      name: yAxis.name,
      splitLine: {
        show: yAxis.showSplitLine,
      },
    },
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

/** 柱状图元数据 */
export const barMeta: ChartMeta<'bar'> = {
  type: 'bar',
  name: '柱状图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'xAxis', 'yAxis', 'series', 'label', 'tooltip'],
  buildOption,
};
