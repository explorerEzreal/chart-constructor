import { EChartsOption } from 'echarts';

type Options = {
  label: string;
  value: string;
}[];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DefaultType = {};

export type ConfigurationKeys = 'title' | 'label' | 'tooltip' | 'pieSeries';

/**
 * @description 给图表配置表单使用的配置项，比如 图表标题的位置，字体粗细。。。
 */
export type SettingsType = {
  title: {
    leftOptions: Options;
    fontWeightOptions: Options;
  };
  label: DefaultType;
  tooltip: {
    triggerTypeOptions: Options;
    triggerOnOptions: Options;
  };
  pieSeries: DefaultType;
};

/**
 * 每个图表可能有不同的配置
 */
export type UniqueConfigType = {
  title: DefaultType;
  label: DefaultType;
  tooltip: DefaultType;
  pieSeries: DefaultType;
};

/**
 * 配置项的value
 */
export type ValueType = {
  title: {
    show: boolean;
    text: string;
    subtext: string;
    left: string;
    textStyle: {
      color: string;
      fontWeight: string;
      fontSize: number;
      textBorderColor: string;
      textBorderType: string;
    };
  };
  pieSeries?: {
    radius: number[];
    itemStyle?: {
      borderRadius: number;
      borderColor: string;
      borderWidth: number;
    };
  };
  label: DefaultType;
  tooltip: {
    show: boolean;
    trigger: string;
    triggerOn: string;
    backgroundColor: string;
  };
};

export type Value<K extends ConfigurationKeys> = ValueType[K];

export type Config<K extends ConfigurationKeys> = {
  title: string; // 标题，标识是什么配置
  fields?: Array<keyof EChartsOption>; // 这个配置在图表options中的位置，可选，没有的话用 K
  settings?: SettingsType[K]; // 图表配置的选项
  uniqueConfig?: UniqueConfigType[K]; // 单独的配置,其他图表类型可能没有的配置项
  defaultValue?: DefaultType; // 默认值
  updateOptions: (value: ValueType[K], options: EChartsOption) => EChartsOption; // 更新options的方法
  transform: (itemsOptions: Partial<EChartsOption>, option?: EChartsOption) => ValueType[K];
};

export type ConfigurationType = {
  [K in ConfigurationKeys]: Config<K>;
};
