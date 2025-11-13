import type { EChartsOption } from 'echarts';
import type { XAxisSetting, YAxisSetting } from '../../types';
import type { SettingBuildContext } from './context';
import { resolveLegendTop } from './layout';

/** 直角坐标系网格 option 片段类型，直接取自 ECharts option 保证可拼接 */
export type GridOption = EChartsOption['grid'];

/** 图例在标题下方时绘制区再下移，否则按标题是否展示取固定留白 */
const resolveGridTop = (context: SettingBuildContext): number =>
  context.settings.legend.show
    ? resolveLegendTop(context) + 48
    : context.settings.title.show
      ? 64
      : 24;

/** 轴名称与刻度标签的间距：末端位不占额外高度，起点/居中位需要拉开距离 */
const resolveNameGap = (nameLocation: XAxisSetting['nameLocation']): number =>
  nameLocation === 'end' ? 15 : 30;

/**
 * 轴名称占用的网格留白
 * containLabel 只兜住刻度标签，轴名称需要额外预留空间，否则会被画布边缘裁掉
 */
const resolveNameInset = (xAxis: XAxisSetting): { right: number; bottom: number } => {
  const hasName = xAxis.show && xAxis.name.trim() !== '';
  if (!hasName) {
    return { right: 0, bottom: 0 };
  }
  // 末端位名称向右延伸，占右侧留白；起点/居中位名称落在刻度下方，占底部留白
  return xAxis.nameLocation === 'end' ? { right: 24, bottom: 0 } : { right: 0, bottom: 16 };
};

/** 由配置项派生直角坐标系网格 option 片段，柱状/折线/散点/组合共用 */
export const buildCartesianGrid = (
  context: SettingBuildContext,
  xAxis?: XAxisSetting,
): GridOption => {
  const inset = xAxis ? resolveNameInset(xAxis) : { right: 0, bottom: 0 };
  return {
    top: resolveGridTop(context),
    left: 48,
    right: 32 + inset.right,
    bottom: 32 + inset.bottom,
    containLabel: true,
  };
};

export type CartesianAxisOptions = {
  xAxis: XAxisSetting;
  yAxis: YAxisSetting;
  /** X 轴类型，散点图为数值轴，其余为分类轴 */
  xAxisType?: 'category' | 'value';
  /** 分类轴数据，数值轴类型无需传入 */
  categories?: string[];
};

/** 由配置项派生 X/Y 轴 option 片段，柱状/折线/散点/组合共用 */
export const buildCartesianAxes = ({
  xAxis,
  yAxis,
  xAxisType = 'category',
  categories,
}: CartesianAxisOptions): Pick<EChartsOption, 'xAxis' | 'yAxis'> => ({
  xAxis: {
    show: xAxis.show,
    type: xAxisType,
    name: xAxis.name,
    nameLocation: xAxis.nameLocation,
    nameGap: resolveNameGap(xAxis.nameLocation),
    // 数值轴不写 data，避免产生无效键
    ...(xAxisType === 'category' ? { data: categories ?? [] } : {}),
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
});
