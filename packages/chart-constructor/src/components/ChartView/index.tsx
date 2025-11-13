import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import { useLatest, useSize } from 'ahooks';
import { useDefaultTheme } from '../../utils/theme';
import type { ChartTheme } from '../../types';

export type ChartViewProps = {
  option: EChartsOption;
  /** 主题名称或主题对象，未传入时使用全局默认主题 */
  theme?: ChartTheme;
  className?: string;
  style?: CSSProperties;
  /** 实例初始化与销毁回调，销毁时传入 null */
  onReady?: (instance: ECharts | null) => void;
};

/** ECharts 渲染容器：负责实例初始化、配置更新与尺寸自适应 */
export const ChartView: FC<ChartViewProps> = ({ option, theme, className, style, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts | null>(null);
  // 实例存入 state，主题切换重建实例后据此重跑 option 应用，避免新实例为空
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const size = useSize(containerRef);
  const onReadyRef = useLatest(onReady);
  // 显式传入的 theme 优先，未传入时回落到全局默认主题
  const globalTheme = useDefaultTheme();
  const resolvedTheme = theme ?? globalTheme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    // 通过 ref 读取最新回调，避免回调变化导致实例反复重建
    const notifyReady = (chart: ECharts | null) => onReadyRef.current?.(chart);
    const chart = echarts.init(container, resolvedTheme);
    chartRef.current = chart;
    setChartInstance(chart);
    notifyReady(chart);

    return () => {
      chart.dispose();
      chartRef.current = null;
      setChartInstance(null);
      notifyReady(null);
    };
  }, [resolvedTheme, onReadyRef]);

  // 实例重建或配置变化时整体覆盖更新，避免残留旧配置
  useEffect(() => {
    chartInstance?.setOption(option, true);
  }, [chartInstance, option]);

  useEffect(() => {
    if (size?.width && size.height) {
      chartRef.current?.resize();
    }
  }, [size?.width, size?.height]);

  return (
    <div
      ref={containerRef}
      className={['cc-chart-view', className].filter(Boolean).join(' ')}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};
