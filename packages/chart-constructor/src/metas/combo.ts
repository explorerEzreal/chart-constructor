import type { EChartsOption } from 'echarts';
import type { ComboChartConfig } from '../types';
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

/** 折线柱状图默认配置项：柱状与折线共用单 Y 轴 */
export const defaultConfig: ComboChartConfig = {
  version: 1,
  type: 'combo',
  data: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      { name: '销售额', type: 'bar', data: [320, 420, 380, 510, 460, 560] },
      { name: '增长率', type: 'line', data: [12, 25, 18, 32, 10, 22] },
    ],
  },
  settings: {
    title: {
      show: true,
      text: '销售额与增长率',
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
      name: '数值',
      showSplitLine: true,
    },
    series: {
      barWidth: 20,
      borderRadius: 4,
      lineWidth: 2,
      smooth: true,
      area: false,
      symbolSize: 6,
    },
  },
};

/** 由配置项派生折线柱状图 ECharts option */
export const buildOption = (config: ComboChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 标题与图例自上而下排布，图例随标题下移
  const context: SettingBuildContext = { type: 'combo', settings, legendBelowTitle: true };

  return {
    title: buildTitleOption(title),
    tooltip: buildTooltipOption(tooltip),
    legend: buildLegendOption(legend, context),
    grid: buildCartesianGrid(context, xAxis),
    ...buildCartesianAxes({ xAxis, yAxis, categories: data.categories }),
    // 每个系列按自身 type 渲染为柱状或折线，共用同一根 Y 轴
    series: data.series.map((item) =>
      item.type === 'bar'
        ? {
            name: item.name,
            type: 'bar' as const,
            data: item.data,
            barWidth: series.barWidth,
            itemStyle: {
              borderRadius: series.borderRadius,
            },
            label: buildLabelOption(label),
          }
        : {
            name: item.name,
            type: 'line' as const,
            data: item.data,
            smooth: series.smooth,
            symbolSize: series.symbolSize,
            lineStyle: {
              width: series.lineWidth,
            },
            areaStyle: series.area ? {} : undefined,
            label: buildLabelOption(label),
          }
    ),
  };
};

/** 折线柱状图元数据 */
export const comboMeta: ChartMeta<'combo'> = {
  type: 'combo',
  name: '折线柱状图',
  defaultConfig,
  settingKeys: ['data', 'title', 'legend', 'xAxis', 'yAxis', 'series', 'label', 'tooltip'],
  buildOption,
};
