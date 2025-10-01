import { getChartMeta } from '../metas';
import type { ChartConfig, ChartType, SettingChangeEvent } from '../types';
import { deepClone, deepMerge, setByPath } from './object';

/** 配置项版本号 */
export const CONFIG_VERSION = 1;

/** 生成指定图表类型的默认配置项 */
export const createDefaultConfig = (type: ChartType = 'pie'): ChartConfig =>
  deepClone(getChartMeta(type).defaultConfig);

/** 克隆配置项 */
export const cloneConfig = (config: ChartConfig): ChartConfig => deepClone(config);

/** 以默认配置为底合并外部配置，兼容历史数据缺字段的情况 */
export const normalizeConfig = (
  config?: Partial<ChartConfig> | null,
  type: ChartType = 'pie'
): ChartConfig => {
  const targetType = (config?.type ?? type) as ChartType;
  const merged = deepMerge(createDefaultConfig(targetType), deepClone(config ?? {}));
  merged.version = CONFIG_VERSION;
  merged.type = targetType;
  return merged;
};

/** 应用一次表单项变更，返回新的配置项 */
export const applySettingChange = (
  config: ChartConfig,
  event: SettingChangeEvent
): ChartConfig => {
  const next = cloneConfig(config);
  const path =
    event.field === 'data' ? `data.${event.name}` : `settings.${event.field}.${event.name}`;
  setByPath(next, path, event.payload);
  return next;
};

/** 序列化配置项，用于比较与复制 */
export const serializeConfig = (config: ChartConfig): string => JSON.stringify(config);
