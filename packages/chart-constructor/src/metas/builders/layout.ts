import type { SettingBuildContext } from './context';

/** 标题下方图例的纵向起点，图例片段与柱状图 grid 计算共用同一份启发式 */
export const resolveLegendTop = (context: SettingBuildContext): number =>
  context.settings.title.show ? 56 : 12;
