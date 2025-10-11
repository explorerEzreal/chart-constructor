import type { EChartsOption } from 'echarts';
import type { BarChartConfig } from '../types';
import type { ChartMeta } from './type';

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

/** 由配置项派生柱状图 ECharts option */
export const buildOption = (config: BarChartConfig): EChartsOption => {
  const { data, settings } = config;
  const { title, legend, label, tooltip, xAxis, yAxis, series } = settings;
  // 标题与图例自上而下排布，据此为绘制区预留顶部空间
  const legendTop = title.show ? 56 : 12;
  const gridTop = legend.show ? legendTop + 48 : title.show ? 64 : 24;

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
          trigger: tooltip.trigger,
          formatter: tooltip.formatter,
        }
      : { show: false },
    legend: legend.show
      ? {
          orient: legend.orient,
          left: legend.left,
          top: legendTop,
        }
      : { show: false },
    grid: {
      top: gridTop,
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
      label: {
        show: label.show,
        position: label.position,
        formatter: label.formatter,
      },
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
