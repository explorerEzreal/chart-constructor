import type { EChartsOption } from 'echarts';
import type { TitleSetting } from '../../types';

/** 标题 option 片段类型，直接取自 ECharts option 保证可拼接 */
export type TitleOption = EChartsOption['title'];

/** 由标题配置派生标题 option 片段，各图表类型共用 */
export const buildTitleOption = (title: TitleSetting): TitleOption =>
  title.show
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
    : { show: false };
