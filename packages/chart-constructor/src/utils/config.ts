import { getChartMeta } from '../metas';
import type {
  ChartConfig,
  ChartData,
  ChartType,
  SettingChangeEvent,
  SettingItemKey,
} from '../types';
import { deepClone, deepMerge, setByPath } from './object';

export const CONFIG_VERSION = 1;

export const createDefaultConfig = (type: ChartType = 'pie'): ChartConfig =>
  deepClone(getChartMeta(type).defaultConfig);

export const cloneConfig = (config: ChartConfig): ChartConfig =>
  deepClone(config);

/**
 * 以默认配置为底依次合并兜底数据与外部配置，兼容历史数据缺字段的情况
 * 合并顺序：内置默认 → defaultData（按差异字段） → 传入配置 → 强制版本与类型
 */
export const normalizeConfig = (
  config?: Partial<ChartConfig> | null,
  type: ChartType = 'pie',
  defaultData?: unknown,
): ChartConfig => {
  const targetType = config?.type ?? type;
  const merged = deepMerge(
    deepMerge(createDefaultConfig(targetType), defaultData),
    deepClone(config ?? {}),
  );
  return Object.assign(merged, { version: CONFIG_VERSION, type: targetType });
};

/** 读取抽屉中某个表单块对应的配置值，屏蔽不同图表类型的结构差异 */
export const getSettingValue = (
  config: ChartConfig,
  key: SettingItemKey,
): unknown =>
  key === 'data'
    ? config.data
    : (config.settings as Record<string, unknown>)[key];

export const applySettingChange = (
  config: ChartConfig,
  event: SettingChangeEvent,
): ChartConfig => {
  const next = cloneConfig(config);
  const path =
    event.field === 'data'
      ? `data.${event.name}`
      : `settings.${event.field}.${event.name}`;
  setByPath(next, path, event.payload);
  return next;
};

/** 序列化配置项，用于比较与复制 */
export const serializeConfig = (config: ChartConfig): string =>
  JSON.stringify(config);

/** 序列化数据块，用于判断取数结果是否与当前数据相同 */
export const serializeData = (data: ChartData): string => JSON.stringify(data);
