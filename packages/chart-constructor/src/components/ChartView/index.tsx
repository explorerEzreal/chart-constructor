import { useEffect, useRef } from 'react';
import type { CSSProperties, FC } from 'react';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import { useLatest, useSize } from 'ahooks';

export type ChartViewProps = {
  /** ECharts 配置 */
  option: EChartsOption;
  /** 主题名称或主题对象 */
  theme?: string | object;
  className?: string;
  style?: CSSProperties;
  /** 实例初始化与销毁回调，销毁时传入 null */
  onReady?: (instance: ECharts | null) => void;
};

/** ECharts 渲染容器：负责实例初始化、配置更新与尺寸自适应 */
export const ChartView: FC<ChartViewProps> = ({ option, theme, className, style, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts | null>(null);
  const size = useSize(containerRef);
  const onReadyRef = useLatest(onReady);

  // 初始化实例，卸载时销毁实例释放内存
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    // 通过 ref 读取最新回调，避免回调变化导致实例反复重建
    const notifyReady = (chart: ECharts | null) => onReadyRef.current?.(chart);
    const instance = echarts.init(container, theme);
    chartRef.current = instance;
    notifyReady(instance);

    return () => {
      instance.dispose();
      chartRef.current = null;
      notifyReady(null);
    };
  }, [theme, onReadyRef]);

  // 配置变化时整体覆盖更新，避免残留旧配置
  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  // 容器尺寸变化时自适应
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
