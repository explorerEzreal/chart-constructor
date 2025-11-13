import type { CSSProperties, ReactNode } from 'react';
import type { ECharts, EChartsOption } from 'echarts';

export type ChartType = 'pie' | 'bar' | 'line' | 'scatter' | 'combo';

export type ChartTheme = string | object;

/** static 常驻在图表上方，float 悬浮于图表右上角 */
export type ToolbarMode = 'static' | 'float';

/** 递归可选类型，用于实例兜底数据只声明差异字段 */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type ChartDataItem = {
  name: string;
  value: number;
};

export type PieChartData = {
  seriesName: string;
  list: ChartDataItem[];
};

/** 柱状图、折线图、折线柱状图共用分类序列结构 */
export type CartesianChartSeries = {
  name: string;
  data: number[];
};

export type BarChartSeries = CartesianChartSeries;

export type LineChartSeries = CartesianChartSeries;

/** 在分类序列上标注该系列渲染为柱状还是折线 */
export type ComboChartSeries = CartesianChartSeries & {
  type: 'bar' | 'line';
};

/** 数值 x/y 坐标对 */
export type ScatterChartSeries = {
  name: string;
  data: [number, number][];
};

export type BarChartData = {
  categories: string[];
  series: BarChartSeries[];
};

export type LineChartData = {
  categories: string[];
  series: LineChartSeries[];
};

export type ComboChartData = {
  categories: string[];
  series: ComboChartSeries[];
};

export type ScatterChartData = {
  series: ScatterChartSeries[];
};

/** 数据块，按图表类型区分结构 */
export type ChartData =
  | PieChartData
  | BarChartData
  | LineChartData
  | ComboChartData
  | ScatterChartData;

/** 各图表类型共用 */
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

/** 各图表类型共用 */
export type LegendSetting = {
  show: boolean;
  orient: 'horizontal' | 'vertical';
  left: 'left' | 'center' | 'right';
};

export type PieLabelSetting = {
  show: boolean;
  position: 'outside' | 'inside';
  formatter: string;
};

export type BarLabelSetting = {
  show: boolean;
  position: 'top' | 'inside' | 'insideTop';
  formatter: string;
};

export type LineLabelSetting = {
  show: boolean;
  position: 'top' | 'bottom' | 'inside';
  formatter: string;
};

export type LabelSetting = PieLabelSetting | BarLabelSetting | LineLabelSetting;

export type PieTooltipSetting = {
  show: boolean;
  formatter: string;
};

export type BarTooltipSetting = {
  show: boolean;
  trigger: 'item' | 'axis';
  formatter: string;
};

/** 折线图、散点图、折线柱状图共用 */
export type CartesianTooltipSetting = {
  show: boolean;
  trigger: 'item' | 'axis';
  formatter: string;
};

export type TooltipSetting = PieTooltipSetting | BarTooltipSetting | CartesianTooltipSetting;

export type XAxisSetting = {
  show: boolean;
  name: string;
  /** 轴名称位置：起点、居中、末端 */
  nameLocation: 'start' | 'middle' | 'end';
  labelRotate: number;
};

export type YAxisSetting = {
  show: boolean;
  name: string;
  showSplitLine: boolean;
};

export type SeriesSetting = {
  barWidth: number;
  borderRadius: number;
  stack: boolean;
};

export type LineSeriesSetting = {
  lineWidth: number;
  smooth: boolean;
  area: boolean;
  showSymbol: boolean;
  symbolSize: number;
};

/** 柱状与折线样式合并，共用单 Y 轴 */
export type ComboSeriesSetting = {
  barWidth: number;
  borderRadius: number;
  lineWidth: number;
  smooth: boolean;
  area: boolean;
  symbolSize: number;
};

export type ScatterSeriesSetting = {
  symbolSize: number;
  symbol: 'circle' | 'rect' | 'triangle' | 'diamond';
};

export type SeriesStyleSetting =
  | SeriesSetting
  | LineSeriesSetting
  | ComboSeriesSetting
  | ScatterSeriesSetting;

export type PieChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: PieLabelSetting;
  tooltip: PieTooltipSetting;
};

export type BarChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: BarLabelSetting;
  tooltip: BarTooltipSetting;
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  series: SeriesSetting;
};

export type LineChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: LineLabelSetting;
  tooltip: CartesianTooltipSetting;
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  series: LineSeriesSetting;
};

export type ScatterChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: LineLabelSetting;
  tooltip: CartesianTooltipSetting;
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  series: ScatterSeriesSetting;
};

export type ComboChartSettings = {
  title: TitleSetting;
  legend: LegendSetting;
  label: LineLabelSetting;
  tooltip: CartesianTooltipSetting;
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  series: ComboSeriesSetting;
};

export type ChartSettings =
  | PieChartSettings
  | BarChartSettings
  | LineChartSettings
  | ScatterChartSettings
  | ComboChartSettings;

export type PieChartConfig = {
  version: 1;
  type: 'pie';
  data: PieChartData;
  settings: PieChartSettings;
};

export type BarChartConfig = {
  version: 1;
  type: 'bar';
  data: BarChartData;
  settings: BarChartSettings;
};

export type LineChartConfig = {
  version: 1;
  type: 'line';
  data: LineChartData;
  settings: LineChartSettings;
};

export type ScatterChartConfig = {
  version: 1;
  type: 'scatter';
  data: ScatterChartData;
  settings: ScatterChartSettings;
};

export type ComboChartConfig = {
  version: 1;
  type: 'combo';
  data: ComboChartData;
  settings: ComboChartSettings;
};

/** 可直接序列化后存入数据库 */
export type ChartConfig =
  | PieChartConfig
  | BarChartConfig
  | LineChartConfig
  | ScatterChartConfig
  | ComboChartConfig;

/** 供元数据与默认配置做类型关联 */
export type ChartConfigMap = {
  pie: PieChartConfig;
  bar: BarChartConfig;
  line: LineChartConfig;
  scatter: ScatterChartConfig;
  combo: ComboChartConfig;
};

/** 供数据源与图表类型做类型关联 */
export type ChartDataMap = {
  pie: PieChartData;
  bar: BarChartData;
  line: LineChartData;
  scatter: ScatterChartData;
  combo: ComboChartData;
};

export type ChartDataOf<T extends ChartType> = ChartDataMap[T];

/** 取数函数上下文：图表类型、当前配置与竞态取消信号 */
export type DataSourceContext<C extends ChartConfig = ChartConfig> = {
  type: C['type'];
  config: C;
  signal: AbortSignal;
};

/** 数据源：静态数据块、同步取数或异步取数函数 */
export type DataSource<C extends ChartConfig = ChartConfig> =
  | ChartDataOf<C['type']>
  | ((
      context: DataSourceContext<C>,
    ) => ChartDataOf<C['type']> | Promise<ChartDataOf<C['type']>>);

export type SettingFieldKey =
  | keyof PieChartSettings
  | keyof BarChartSettings
  | keyof LineChartSettings
  | keyof ScatterChartSettings
  | keyof ComboChartSettings;

export type SettingItemKey = SettingFieldKey | 'data';

export type SettingFieldEvent = {
  name: string;
  payload: unknown;
};

export type SettingChangeEvent = SettingFieldEvent & {
  field: SettingItemKey;
};

export type SettingItemProps = {
  /** 当前图表类型，表单据此渲染类型差异字段 */
  chartType: ChartType;
  value: any;
  onChange: (event: SettingFieldEvent) => void;
};

/** 内置与自定义工具共用 */
export type ToolContext = {
  config: ChartConfig;
  option: EChartsOption;
  instance: ECharts | null;
  /** 数据源是否为取数函数，为 true 时内置工具才提供刷新项 */
  canRefreshData: boolean;
  /** 重新执行取数函数，静态数据源下为空操作 */
  refreshData: () => void;
  openEdit: () => void;
  closeEdit: () => void;
  reset: () => void;
  copyConfig: () => void;
  copyOption: () => void;
  downloadPng: () => void;
  screenshot: () => void;
};

/** 外部可覆盖同 key 内置项或追加新项 */
export type ToolItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  /** 悬停提示文案，仅在传入时展示；图标化工具栏用它补全工具名称 */
  tooltip?: string;
  onClick?: (ctx: ToolContext) => void;
};

export type ResolvedToolItem = Omit<ToolItem, 'onClick'> & {
  onClick?: () => void;
};

/** 泛型与传入配置的图表类型联动 */
export type CEchartProps<C extends ChartConfig = ChartConfig> = {
  /** 初始配置项，未传入时使用内置饼图默认配置 */
  value?: C;
  /** 初始配置项（value 的别名） */
  defaultValue?: C;
  /** 数据源：静态数据块、同步取数或异步取数函数，取数结果优先于 value 中的数据 */
  data?: DataSource<C>;
  /** 实例级兜底数据，仅在无取数结果且未提供 value.data 时生效，按差异字段深合并 */
  defaultData?: DeepPartial<ChartDataOf<C['type']>>;
  /** 编辑过程中实时输出的配置项 */
  onChange?: (config: C) => void;
  /** 点击保存时输出的最新配置项 */
  onSave?: (config: C) => void;
  /** 是否展示操作栏，默认 true */
  showToolbar?: boolean;
  /** 操作栏展示形态，默认常驻；悬浮形态贴图表右上角并在悬停时淡入 */
  toolbarMode?: ToolbarMode;
  /** 自定义工具项，同 key 覆盖内置项，新 key 追加 */
  tools?: ToolItem[];
  /** 是否允许编辑，默认 true */
  editable?: boolean;
  width?: number | string;
  height?: number | string;
  /** ECharts 主题名称或主题对象，未传入时使用全局默认主题 */
  theme?: ChartTheme;
  className?: string;
  style?: CSSProperties;
  onReady?: (instance: ECharts) => void;
};
