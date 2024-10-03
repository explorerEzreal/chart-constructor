import { EChartsOption } from 'echarts';

export type ConfigurationKeys = 'title' | 'label' | 'toolTip';

export type Config = {
  title: string; // 标题，标识是什么配置
  uniqueConfig?; // 单独的配置,其他图表类型可能没有的配置项
  defaultValue?: unknown; // 默认值
  updateOptions: (value: unknown, options: EChartsOption) => EChartsOption; // 更新options的方法
};

export type ConfigurationType = Record<ConfigurationKeys, Config>;
