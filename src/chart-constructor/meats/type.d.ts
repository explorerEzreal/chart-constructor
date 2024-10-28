import { EChartsOption } from 'echarts';

type Options = {
  label: string;
  value: string;
}[];

type DefaultType = {};

export type ConfigurationKeys = 'title' | 'label' | 'toolTip' | 'pieSeries';

/**
 * @description 给图表配置表单使用的配置项，比如 图表标题的位置，字体粗细。。。
 */
export type SettingsType = {
  title: {
    leftOptions: Options;
    fontWeightOptions: Options;
  };
  label: DefaultType;
  toolTip: DefaultType;
  pieSeries: DefaultType;
};

/**
 * 每个图表可能有不同的配置
 */
export type UniqueConfigType = {
  title: DefaultType;
  label: DefaultType;
  toolTip: DefaultType;
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
  pieSeries: {
    /**
     * @description 饼图的类型，是一般饼图还是环形图
     */
    type: 'common' | 'ring';
    radius: number | number[];
    itemStyle?: {
      borderRadius: number;
      borderColor: string;
      borderWidth: number;
    };
  };
  label: DefaultType;
  toolTip: DefaultType;
};

export type Value<K extends ConfigurationKeys> = ValueType[K];

export type Config<K extends ConfigurationKeys> = {
  title: string; // 标题，标识是什么配置
  settings?: SettingsType[K]; // 图表配置的选项
  uniqueConfig?: UniqueConfigType[K]; // 单独的配置,其他图表类型可能没有的配置项
  defaultValue?: DefaultType; // 默认值
  updateOptions: (value: ValueType[K], options: EChartsOption) => EChartsOption; // 更新options的方法
  // transform: (options: EChartsOption) => ValueType[K];
};

export type ConfigurationType = {
  [K in ConfigurationKeys]: Config<K>;
};
