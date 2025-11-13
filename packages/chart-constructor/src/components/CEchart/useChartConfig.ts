import { useCallback, useEffect, useRef, useState } from 'react';
import { useLatest } from 'ahooks';
import {
  applySettingChange,
  cloneConfig,
  createDefaultConfig,
  normalizeConfig,
  serializeConfig,
  serializeData,
} from '../../utils/config';
import { deepClone } from '../../utils/object';
import type { ChartConfig, ChartData, SettingChangeEvent } from '../../types';

const withData = (config: ChartConfig, data: ChartData): ChartConfig =>
  ({ ...config, data: deepClone(data) }) as unknown as ChartConfig;

export type UseChartConfigOptions = {
  value?: ChartConfig;
  defaultValue?: ChartConfig;
  onChange?: (config: ChartConfig) => void;
  /** 实例级兜底数据，合并到内置默认之上，仅影响初始化与外部配置同步 */
  defaultData?: unknown;
  /** 静态数据源，初始化时直接覆盖数据块，避免首帧使用默认数据 */
  initialData?: ChartData;
  /** 数据由取数函数托管：外部配置变化只同步类型与配置项，保留当前数据 */
  dataManaged?: boolean;
};

/**
 * 管理配置项状态：已提交配置驱动主图，编辑草稿驱动抽屉表单与预览
 * 点编辑时取快照，编辑过程只改草稿，点保存才提交并对外输出
 */
export const useChartConfig = ({
  value,
  defaultValue,
  onChange,
  defaultData,
  initialData,
  dataManaged = false,
}: UseChartConfigOptions) => {
  // 静态数据源只在挂载时读取一次，后续变化由组件通过 setData 写回
  const initialDataRef = useRef<ChartData | undefined>(initialData);
  const defaultDataRef = useLatest(defaultData);
  const dataManagedRef = useLatest(dataManaged);
  // 编辑标记同步落 ref，保证同一事件内到达的外部配置能被立即拦截
  const editingRef = useRef(false);
  const snapshotRef = useRef<ChartConfig | null>(null);
  const lastEmittedRef = useRef('');

  const buildInitialConfig = useCallback((): ChartConfig => {
    const config = normalizeConfig(value ?? defaultValue, 'pie', defaultDataRef.current);
    return initialDataRef.current === undefined ? config : withData(config, initialDataRef.current);
  }, [value, defaultValue, defaultDataRef]);

  const [committedConfig, setCommittedConfig] = useState<ChartConfig>(buildInitialConfig);
  const [draftConfig, setDraftConfig] = useState<ChartConfig>(buildInitialConfig);
  const [editing, setEditing] = useState(false);
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

  const beginEdit = useCallback(() => {
    const snapshot = cloneConfig(committedRef.current);
    snapshotRef.current = snapshot;
    draftRef.current = cloneConfig(snapshot);
    setDraftConfig(draftRef.current);
    editingRef.current = true;
    setEditing(true);
  }, [committedRef, draftRef]);

  const changeSetting = useCallback(
    (event: SettingChangeEvent) => {
      const next = applySettingChange(draftRef.current, event);
      draftRef.current = next;
      setDraftConfig(next);
    },
    [draftRef],
  );

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

  const cancelEdit = useCallback(() => {
    const snapshot = snapshotRef.current ?? cloneConfig(committedRef.current);
    snapshotRef.current = null;
    draftRef.current = snapshot;
    setDraftConfig(snapshot);
    editingRef.current = false;
    setEditing(false);
  }, [committedRef, draftRef]);

  const reset = useCallback(() => {
    const next = createDefaultConfig(committedRef.current.type);
    committedRef.current = next;
    setCommittedConfig(next);
    draftRef.current = next;
    setDraftConfig(next);
    emit(next);
  }, [committedRef, draftRef, emit]);

  // 写回数据源结果：只替换数据块，草稿中其余字段的在编辑改动保持不变
  const setData = useCallback(
    (data: ChartData) => {
      if (serializeData(data) === serializeData(committedRef.current.data)) {
        return;
      }
      const nextCommitted = withData(committedRef.current, data);
      committedRef.current = nextCommitted;
      setCommittedConfig(nextCommitted);
      const nextDraft = withData(draftRef.current, data);
      draftRef.current = nextDraft;
      setDraftConfig(nextDraft);
    },
    [committedRef, draftRef],
  );

  // 外部配置变化时同步：编辑期间完全忽略，其余情况忽略自身输出回流
  useEffect(() => {
    if (!value || editingRef.current) {
      return;
    }
    const incoming = normalizeConfig(value, 'pie', defaultDataRef.current);
    const incomingKey = serializeConfig(incoming);
    if (incomingKey === lastEmittedRef.current) {
      return;
    }
    // 数据由取数函数托管且类型未变时，只同步类型与配置项，数据保留当前取数结果
    const next =
      dataManagedRef.current && incoming.type === committedRef.current.type
        ? withData(incoming, committedRef.current.data)
        : incoming;
    if (serializeConfig(next) === serializeConfig(committedRef.current)) {
      return;
    }
    committedRef.current = next;
    setCommittedConfig(next);
    draftRef.current = next;
    setDraftConfig(next);
  }, [value, committedRef, draftRef, defaultDataRef, dataManagedRef]);

  return {
    committedConfig,
    draftConfig,
    editing,
    beginEdit,
    changeSetting,
    commitEdit,
    cancelEdit,
    reset,
    setData,
  };
};
