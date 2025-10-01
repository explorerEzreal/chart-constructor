import { useCallback, useEffect, useRef, useState } from 'react';
import { useLatest } from 'ahooks';
import {
  applySettingChange,
  cloneConfig,
  createDefaultConfig,
  normalizeConfig,
  serializeConfig,
} from '../../utils/config';
import type { ChartConfig, SettingChangeEvent } from '../../types';

export type UseChartConfigOptions = {
  value?: ChartConfig;
  defaultValue?: ChartConfig;
  onChange?: (config: ChartConfig) => void;
};

/** 管理配置项状态：初始化、外部同步、实时变更输出与取消回滚 */
export const useChartConfig = ({ value, defaultValue, onChange }: UseChartConfigOptions) => {
  const [config, setConfig] = useState<ChartConfig>(() => normalizeConfig(value ?? defaultValue));
  const snapshotRef = useRef<ChartConfig | null>(null);
  const lastEmittedRef = useRef('');
  const configRef = useLatest(config);
  const onChangeRef = useLatest(onChange);

  // 更新配置并输出变更
  const commit = useCallback(
    (next: ChartConfig) => {
      setConfig(next);
      lastEmittedRef.current = serializeConfig(next);
      onChangeRef.current?.(next);
    },
    [onChangeRef]
  );

  // 表单项变更（抽屉内实时编辑）
  const changeSetting = useCallback(
    (event: SettingChangeEvent) => {
      commit(applySettingChange(configRef.current, event));
    },
    [commit, configRef]
  );

  // 重置为当前图表类型的默认配置
  const reset = useCallback(() => {
    commit(createDefaultConfig(configRef.current.type));
  }, [commit, configRef]);

  // 记录当前配置快照
  const takeSnapshot = useCallback(() => {
    snapshotRef.current = cloneConfig(configRef.current);
  }, [configRef]);

  // 回滚到最近一次快照
  const rollback = useCallback(() => {
    const snapshot = snapshotRef.current;
    if (!snapshot) {
      return;
    }
    snapshotRef.current = null;
    commit(snapshot);
  }, [commit]);

  // 外部配置变化时同步，忽略自身输出导致的同值回流
  useEffect(() => {
    if (!value) {
      return;
    }
    const incoming = normalizeConfig(value);
    const incomingKey = serializeConfig(incoming);
    if (incomingKey === lastEmittedRef.current) {
      return;
    }
    if (incomingKey === serializeConfig(configRef.current)) {
      return;
    }
    setConfig(incoming);
  }, [value, configRef]);

  return { config, changeSetting, reset, takeSnapshot, rollback };
};
