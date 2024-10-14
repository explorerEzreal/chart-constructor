import { EChartsOption } from 'echarts';

type Options = {
  label: string;
  value: string;
}[];

type DefaultType = {};

export type ConfigurationKeys = 'title' | 'label' | 'toolTip';

export type SettingsType = {
  title: {
    leftOptions: Options;
    fontWeightOptions: Options;
  };
  label: DefaultType;
  toolTip: DefaultType;
};

export type UniqueConfigType = {
  title: DefaultType;
  label: DefaultType;
  toolTip: DefaultType;
};

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
  label: DefaultType;
  toolTip: DefaultType;
};

export type Config<K extends ConfigurationKeys> = {
  title: string; // 标题，标识是什么配置
  setttings?: SettingsType[K]; // 图表配置的选项
  uniqueConfig?: UniqueConfigType[K]; // 单独的配置,其他图表类型可能没有的配置项
  defaultValue?: DefaultType; // 默认值
  updateOptions: (value: DefaultType, options: EChartsOption) => EChartsOption; // 更新options的方法
  transform: (options: EChartsOption) => ValueType[K];
};

export type ConfigurationType = {
  [K in ConfigurationKeys]: Config<K>;
};
