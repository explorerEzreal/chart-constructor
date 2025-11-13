import { useSyncExternalStore } from 'react';
import * as echarts from 'echarts';
import type { ChartTheme } from '../types';

/** 全局默认主题，未显式传入 theme 的图表使用 */
let defaultTheme: ChartTheme | undefined;

const listeners = new Set<() => void>();

/** 注册 ECharts 主题，作为对外统一入口；需在图表初始化前调用 */
export const registerTheme = (name: string, theme: object): void => {
  echarts.registerTheme(name, theme);
};

/** 设置全局默认主题，传入 undefined 表示清除 */
export const setDefaultTheme = (theme?: ChartTheme): void => {
  defaultTheme = theme;
  listeners.forEach((listener) => listener());
};

export const getDefaultTheme = (): ChartTheme | undefined => defaultTheme;

/** 订阅全局默认主题变更，返回取消订阅函数 */
export const subscribeDefaultTheme = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** 读取全局默认主题的响应式 hook，保证运行期切换主题时图表同步重建 */
export const useDefaultTheme = (): ChartTheme | undefined =>
  // 第三个参数供服务端渲染读取快照，避免 SSR 下缺少 getServerSnapshot 报错
  useSyncExternalStore(subscribeDefaultTheme, getDefaultTheme, getDefaultTheme);
