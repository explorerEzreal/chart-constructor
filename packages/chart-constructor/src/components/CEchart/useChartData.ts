import { useCallback, useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { useLatest } from 'ahooks';
import type { ChartConfig, ChartData, DataSource, DataSourceContext } from '../../types';

export type UseChartDataOptions = {
  /** 数据源，为函数时才会触发取数 */
  data?: DataSource<ChartConfig>;
  /** 当前已提交配置，作为取数函数的上下文 */
  config: ChartConfig;
  /** 取数成功回调，用于把结果写回配置 */
  onData: (data: ChartData) => void;
};

/**
 * 执行异步取数：挂载、函数引用变化与图表类型变化时自动触发
 * 用自增请求号加 AbortController 保证竞态下只有最后一次结果生效
 */
export const useChartData = ({ data, config, onData }: UseChartDataOptions) => {
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);
  const dataRef = useLatest(data);
  const configRef = useLatest(config);
  const onDataRef = useLatest(onData);

  // 卸载时中断在途请求并让回包失效，避免对已卸载组件写状态
  useEffect(
    () => () => {
      requestIdRef.current += 1;
      controllerRef.current?.abort();
      controllerRef.current = null;
    },
    [],
  );

  const reload = useCallback(async () => {
    const source = dataRef.current;
    if (typeof source !== 'function') {
      return;
    }
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = (requestIdRef.current += 1);
    setLoading(true);
    try {
      const context: DataSourceContext<ChartConfig> = {
        type: configRef.current.type,
        config: configRef.current,
        signal: controller.signal,
      };
      const payload = await source(context);
      if (requestId !== requestIdRef.current || controller.signal.aborted) {
        return;
      }
      onDataRef.current(payload);
    } catch (error) {
      // 中断属于正常流程，静默跳过；其余错误统一提示并保留上一次数据
      const aborted = controller.signal.aborted || (error as Error)?.name === 'AbortError';
      if (!aborted && requestId === requestIdRef.current) {
        message.error('请求失败，请稍后重试');
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [dataRef, configRef, onDataRef]);

  // 仅在数据源为函数时触发：静态数据无需请求，也就没有加载态
  const source = typeof data === 'function' ? data : undefined;
  useEffect(() => {
    if (!source) {
      // 数据源切回静态值：中断在途请求并清除加载态，避免遗留遮罩
      requestIdRef.current += 1;
      controllerRef.current?.abort();
      controllerRef.current = null;
      setLoading(false);
      return;
    }
    void reload();
  }, [source, config.type, reload]);

  return { loading, reload };
};
