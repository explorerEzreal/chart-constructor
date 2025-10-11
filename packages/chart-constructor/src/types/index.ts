import type { CSSProperties, ReactNode } from 'react';
import type { ECharts, EChartsOption } from 'echarts';

/** 图表类型 */
export type ChartType = 'pie' | 'bar';

/** 饼图数据项 */
export type ChartDataItem = {
  name: string;
  value: number;
};

/** 饼图数据块 */
export type PieChartData = {
  seriesName: string;
  list: ChartDataItem[];
};

/** 柱状图系列数据 */
export type BarChartSeries = {
  name: string;
  data: number[];
};

/** 柱状图数据块 */
export type BarChartData = {
  categories: string[];
  series: BarChartSeries[];
};

/** 数据块，按图表类型区分结构 */
export type ChartData = PieChartData | BarChartData;

/** 标题配置，各图表类型共用 */
export type TitleSetting = {
  show: boolean;
  text: string;
  subtext: string;
  left: 'left' | 'center' | 'right';
  textStyle: {
    color: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter';
  };
};

/** 图例配置，各图表类型共用 */
export type LegendSetting = {
  show: boolean;
  orient: 'horizontal' | 'vertical';
  left: 'left' | 'center' | 'right';
};

/** 饼图数值标签配置 */
export type PieLabelSetting = {
  show: boolean;
  position: 'outside' | 'inside';
  formatter: string;
};

/** 柱状图数值标签配置 */
export type BarLabelSetting = {
  show: boolean;
  position: 'top' | 'inside' | 'insideTop';
  formatter: string;
};

/** 数值标签配置 */
export type LabelSetting = PieLabelSetting | BarLabelSetting;

/** 饼图提示框配置 */
export type PieTooltipSetting = {
  show: boolean;
  formatter: string;
};

/** 柱状图提示框配置 */
export type BarTooltipSetting = {
  show: boolean;
  trigger: 'item' | 'axis';
  formatter: string;
};

/** 提示框配置 */
export type TooltipSetting = PieTooltipSetting | BarTooltipSetting;

/** X 轴配置 */
export type XAxisSetting = {
  show: boolean;
  name: string;
  labelRotate: number;
};

/** Y 轴配置 */
export type YAxisSetting = {
  show: boolean;
  name: string;
  showSplitLine: boolean;
};

/** 柱状图系列样式配置 */
export type SeriesSetting = {
  barWidth: number;
  borderRadius: number;
  stack: boolean;
};

/** 饼图配置项集合 */
export type PieChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: PieLabelSetting;
  tooltip: PieTooltipSetting;
};

/** 柱状图配置项集合 */
export type BarChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: BarLabelSetting;
  tooltip: BarTooltipSetting;
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  series: SeriesSetting;
};

/** 图表配置项集合，按图表类型区分 */
export type ChartSettings = PieChartSettings | BarChartSettings;

/** 饼图配置项 */
export type PieChartConfig = {
  version: 1;
  type: 'pie';
  data: PieChartData;
  settings: PieChartSettings;
};

/** 柱状图配置项 */
export type BarChartConfig = {
  version: 1;
  type: 'bar';
  data: BarChartData;
  settings: BarChartSettings;
};

/** 图表配置项，可直接序列化后存入数据库 */
export type ChartConfig = PieChartConfig | BarChartConfig;

/** 图表类型与配置项的映射，供元数据与默认配置做类型关联 */
export type ChartConfigMap = {
  pie: PieChartConfig;
  bar: BarChartConfig;
};

/** 表单可编辑的配置块 */
export type SettingFieldKey = keyof PieChartSettings | keyof BarChartSettings;

/** 抽屉中可编辑的表单块：配置块 + 数据块 */
export type SettingItemKey = SettingFieldKey | 'data';

/** 表单项内部变更事件 */
export type SettingFieldEvent = {
  name: string;
  payload: unknown;
};

/** 抽屉表单统一变更事件 */
export type SettingChangeEvent = SettingFieldEvent & {
  field: SettingItemKey;
};

/** 表单项组件统一 props */
export type SettingItemProps = {
  /** 当前图表类型，表单据此渲染类型差异字段 */
  chartType: ChartType;
  value: any;
  onChange: (event: SettingFieldEvent) => void;
};

/** 工具栏上下文，内置与自定义工具共用 */
export type ToolContext = {
  config: ChartConfig;
  option: EChartsOption;
  instance: ECharts | null;
  openEdit: () => void;
  closeEdit: () => void;
  reset: () => void;
  copyConfig: () => void;
  copyOption: () => void;
  downloadPng: () => void;
  screenshot: () => void;
};

/** 工具项定义，外部可覆盖同 key 内置项或追加新项 */
export type ToolItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: (ctx: ToolContext) => void;
};

/** 已绑定上下文的工具项，供操作栏直接渲染 */
export type ResolvedToolItem = Omit<ToolItem, 'onClick'> & {
  onClick?: () => void;
};

/** CEchart 组件 props */
export type CEchartProps = {
  /** 初始配置项，未传入时使用内置饼图默认配置 */
  value?: ChartConfig;
  /** 初始配置项（value 的别名） */
  defaultValue?: ChartConfig;
  /** 编辑过程中实时输出的配置项 */
  onChange?: (config: ChartConfig) => void;
  /** 点击保存时输出的最新配置项 */
  onSave?: (config: ChartConfig) => void;
  /** 是否展示操作栏，默认 true */
  showToolbar?: boolean;
  /** 自定义工具项，同 key 覆盖内置项，新 key 追加 */
  tools?: ToolItem[];
  /** 是否允许编辑，默认 true */
  editable?: boolean;
  width?: number | string;
  height?: number | string;
  /** ECharts 主题名称或主题对象 */
  theme?: string | object;
  className?: string;
  style?: CSSProperties;
  /** 图表实例就绪回调 */
  onReady?: (instance: ECharts) => void;
};
