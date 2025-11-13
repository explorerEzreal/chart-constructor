const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === '[object Object]';

/** 深拷贝纯数据对象（配置项均为 JSON 安全数据） */
export const deepClone = <T>(value: T): T => {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

/** 以 base 为底递归合并 override，数组与基础类型整体覆盖 */
export const deepMerge = <T>(base: T, override: unknown): T => {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const result: Record<string, unknown> = { ...base };
  Object.keys(override).forEach((key) => {
    result[key] = deepMerge(result[key], override[key]);
  });
  return result as T;
};

/** 按 a.b.c 路径写入值，路径不存在时自动创建 */
export const setByPath = <T>(target: T, path: string, value: unknown): T => {
  const keys = path.split('.');
  let current = target as unknown as Record<string, unknown>;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
      return;
    }
    if (!isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  });

  return target;
};
