import './style/index.less';

export { CEchart } from './components';
export { buildOption } from './utils/buildOption';
export { CONFIG_VERSION, createDefaultConfig, normalizeConfig } from './utils/config';
export type {
  BarChartConfig,
  BarChartData,
  BarChartSeries,
  BarChartSettings,
  BarLabelSetting,
  BarTooltipSetting,
  CEchartProps,
  ChartConfig,
  ChartConfigMap,
  ChartData,
  ChartDataItem,
  ChartSettings,
  ChartType,
  LabelSetting,
  LegendSetting,
  PieChartConfig,
  PieChartData,
  PieChartSettings,
  PieLabelSetting,
  PieTooltipSetting,
  SeriesSetting,
  SettingChangeEvent,
  SettingFieldKey,
  SettingItemKey,
  TitleSetting,
  ToolContext,
  ToolItem,
  TooltipSetting,
  XAxisSetting,
  YAxisSetting,
} from './types';
export { CEchart as default } from './components';
