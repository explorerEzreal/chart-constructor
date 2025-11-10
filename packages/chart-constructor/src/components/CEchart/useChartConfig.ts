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

/**
 * 管理配置项状态：已提交配置驱动主图，编辑草稿驱动抽屉表单与预览
 * 点编辑时取快照，编辑过程只改草稿，点保存才提交并对外输出
 */
export const useChartConfig = ({ value, defaultValue, onChange }: UseChartConfigOptions) => {
  const [committedConfig, setCommittedConfig] = useState<ChartConfig>(() =>
    normalizeConfig(value ?? defaultValue),
  );
  const [draftConfig, setDraftConfig] = useState<ChartConfig>(() =>
    normalizeConfig(value ?? defaultValue),
  );
  const [editing, setEditing] = useState(false);
  const snapshotRef = useRef<ChartConfig | null>(null);
  const lastEmittedRef = useRef('');
  // 编辑标记同步落 ref，保证同一事件内到达的外部配置能被立即拦截
  const editingRef = useRef(false);
  const committedRef = useLatest(committedConfig);
  const draftRef = useLatest(draftConfig);
  const onChangeRef = useLatest(onChange);

  // 对外输出配置；记录输出值用于识别外部同值回流
  const emit = useCallback(
    (next: ChartConfig) => {
      lastEmittedRef.current = serializeConfig(next);
      onChangeRef.current?.(next);
    },
    [onChangeRef],
  );

  // 进入编辑：以当前已提交配置作为快照与草稿起点
  const beginEdit = useCallback(() => {
    const snapshot = cloneConfig(committedRef.current);
    snapshotRef.current = snapshot;
    draftRef.current = cloneConfig(snapshot);
    setDraftConfig(draftRef.current);
    editingRef.current = true;
    setEditing(true);
  }, [committedRef, draftRef]);

  // 表单项变更：只改草稿，编辑期间不对外输出
  const changeSetting = useCallback(
    (event: SettingChangeEvent) => {
      const next = applySettingChange(draftRef.current, event);
      draftRef.current = next;
      setDraftConfig(next);
    },
    [draftRef],
  );

  // 保存：草稿提升为已提交并输出，值未变化时跳过输出
  const commitEdit = useCallback(() => {
    const next = cloneConfig(draftRef.current);
    const changed = serializeConfig(next) !== serializeConfig(committedRef.current);
    committedRef.current = next;
    setCommittedConfig(next);
    draftRef.current = next;
    setDraftConfig(next);
    snapshotRef.current = null;
    editingRef.current = false;
    setEditing(false);
    if (changed) {
      emit(next);
    }
    return next;
  }, [committedRef, draftRef, emit]);

  // 取消：丢弃草稿回到快照，不对外输出
  const cancelEdit = useCallback(() => {
    const snapshot = snapshotRef.current ?? cloneConfig(committedRef.current);
    snapshotRef.current = null;
    draftRef.current = snapshot;
    setDraftConfig(snapshot);
    editingRef.current = false;
    setEditing(false);
  }, [committedRef, draftRef]);

  // 重置为当前图表类型的默认配置，立即提交并输出
  const reset = useCallback(() => {
    const next = createDefaultConfig(committedRef.current.type);
    committedRef.current = next;
    setCommittedConfig(next);
    draftRef.current = next;
    setDraftConfig(next);
    emit(next);
  }, [committedRef, draftRef, emit]);

  // 外部配置变化时同步：编辑期间完全忽略，其余情况忽略自身输出回流
  useEffect(() => {
    if (!value || editingRef.current) {
      return;
    }
    const incoming = normalizeConfig(value);
    const incomingKey = serializeConfig(incoming);
    if (incomingKey === lastEmittedRef.current) {
      return;
    }
    if (incomingKey === serializeConfig(committedRef.current)) {
      return;
    }
    committedRef.current = incoming;
    setCommittedConfig(incoming);
    draftRef.current = incoming;
    setDraftConfig(incoming);
  }, [value, committedRef, draftRef]);

  return {
    committedConfig,
    draftConfig,
    editing,
    beginEdit,
    changeSetting,
    commitEdit,
    cancelEdit,
    reset,
  };
};
