import { createDefaultConfig } from 'chart-constructor';
import type { ChartConfig, ChartConfigMap, ChartType } from 'chart-constructor';

/** 单个示例：示例名称 + 一份完整配置项 */
export type ChartExample = {
  id: string;
  title: string;
  config: ChartConfig;
};

/** 递归可选类型，示例只需声明相对默认值的差异字段 */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

/** 判断是否为可递归合并的普通对象 */
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** 以默认配置为底递归合并差异项，数组与基础类型整体覆盖 */
const mergeConfig = (
  base: Record<string, unknown>,
  patch: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = { ...base };
  Object.entries(patch).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    const current = result[key];
    result[key] =
      isPlainObject(value) && isPlainObject(current) ? mergeConfig(current, value) : value;
  });
  return result;
};

/** 生成示例配置：以图表类型默认配置为底，仅覆盖示例声明的字段 */
const createExampleConfig = <T extends ChartType>(
  type: T,
  patch: DeepPartial<ChartConfigMap[T]>
): ChartConfigMap[T] =>
  mergeConfig(
    createDefaultConfig(type) as unknown as Record<string, unknown>,
    patch as unknown as Record<string, unknown>
  ) as unknown as ChartConfigMap[T];

/** 内置示例清单，按图表类型分组，新增示例直接追加 */
export const chartExamples: Record<ChartType, ChartExample[]> = {
  pie: [
    {
      id: 'pie-basic',
      title: '基础饼图',
      config: createExampleConfig('pie', {}),
    },
    {
      id: 'pie-label-inside',
      title: '内标签饼图',
      config: createExampleConfig('pie', {
        data: {
          seriesName: '流量来源',
          list: [
            { name: '直接访问', value: 335 },
            { name: '搜索引擎', value: 310 },
            { name: '社交媒体', value: 234 },
            { name: '外部链接', value: 135 },
          ],
        },
        settings: {
          title: { text: '流量来源占比', subtext: '按访问渠道统计' },
          label: { show: true, position: 'inside', formatter: '{d}%' },
        },
      }),
    },
    {
      id: 'pie-no-legend',
      title: '无图例饼图',
      config: createExampleConfig('pie', {
        data: {
          seriesName: '销售品类',
          list: [
            { name: '电子产品', value: 480 },
            { name: '服装鞋帽', value: 320 },
            { name: '食品饮料', value: 260 },
            { name: '家居家装', value: 180 },
            { name: '其他', value: 120 },
          ],
        },
        settings: {
          title: { text: '销售品类分布' },
          legend: { show: false },
        },
      }),
    },
    {
      id: 'pie-minimal',
      title: '精简样式饼图',
      config: createExampleConfig('pie', {
        data: {
          seriesName: '渠道占比',
          list: [
            { name: '线上渠道', value: 55 },
            { name: '线下门店', value: 30 },
            { name: '混合渠道', value: 15 },
          ],
        },
        settings: {
          title: { show: false },
          legend: { show: true, orient: 'horizontal', left: 'center' },
          label: { show: true, position: 'inside', formatter: '{d}%' },
        },
      }),
    },
  ],
  bar: [
    {
      id: 'bar-basic',
      title: '基础柱状图',
      config: createExampleConfig('bar', {}),
    },
    {
      id: 'bar-multi-series',
      title: '多系列柱状图',
      config: createExampleConfig('bar', {
        data: {
          categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series: [
            { name: '线上', data: [120, 200, 150, 80, 70, 110, 130] },
            { name: '线下', data: [60, 90, 80, 40, 50, 70, 90] },
            { name: '合作', data: [40, 60, 50, 30, 20, 40, 50] },
          ],
        },
        settings: {
          title: { text: '各渠道周销量' },
          series: { barWidth: 12, borderRadius: 2 },
        },
      }),
    },
    {
      id: 'bar-stack',
      title: '堆叠柱状图',
      config: createExampleConfig('bar', {
        data: {
          categories: ['一季度', '二季度', '三季度', '四季度'],
          series: [
            { name: '线上', data: [320, 420, 380, 510] },
            { name: '线下', data: [180, 210, 240, 260] },
            { name: '合作', data: [90, 120, 100, 150] },
          ],
        },
        settings: {
          title: { text: '季度销量构成' },
          label: { show: true, position: 'inside', formatter: '{c}' },
          xAxis: { name: '季度' },
          series: { barWidth: 32, borderRadius: 0, stack: true },
        },
      }),
    },
    {
      id: 'bar-clean',
      title: '隐藏图例与 Y 轴',
      config: createExampleConfig('bar', {
        data: {
          categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
          series: [{ name: '订单量', data: [820, 932, 901, 934, 1290, 1330] }],
        },
        settings: {
          title: { text: '月订单量' },
          legend: { show: false },
          label: { show: true, position: 'top', formatter: '{c}' },
          xAxis: { name: '月份' },
          yAxis: { show: false },
        },
      }),
    },
  ],
};

/** 示例 id 到示例的映射，供页面按 id 找回初始配置 */
export const exampleMap: Record<string, ChartExample> = Object.values(chartExamples)
  .flat()
  .reduce<Record<string, ChartExample>>((acc, example) => {
    acc[example.id] = example;
    return acc;
  }, {});

/** 读取指定示例的初始配置，返回深拷贝避免外部修改污染示例清单 */
export const getExampleInitialConfig = (id: string): ChartConfig => {
  const example = exampleMap[id];
  return JSON.parse(JSON.stringify(example?.config ?? createDefaultConfig())) as ChartConfig;
};

/** 生成示例 id 到初始配置的映射，用于初始化每张卡片的状态 */
export const createExampleConfigMap = (): Record<string, ChartConfig> =>
  Object.keys(exampleMap).reduce<Record<string, ChartConfig>>((acc, id) => {
    acc[id] = getExampleInitialConfig(id);
    return acc;
  }, {});
