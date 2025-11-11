import { useCallback, useMemo, useState } from 'react';
import { Segmented, message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { getChartMeta, listChartMetas, setDefaultTheme } from 'react-chart-constructor';
import type { ChartConfig, ChartType, ToolbarMode } from 'react-chart-constructor';
import { ChartTypePicker } from '@/components';
import ExampleCard from './ExampleCard';
import { chartExamples, createExampleConfigMap, getExampleInitialConfig } from './examples';
import './index.less';

/** 校验地址栏中的类型参数，非法值回退到首个注册类型 */
const resolveChartType = (value: string | null, types: ChartType[]): ChartType =>
  types.includes(value as ChartType) ? (value as ChartType) : types[0];

/** 主题切换项：默认与 ECharts 5 内置深色主题 */
const THEME_OPTIONS = [
  { label: '默认主题', value: 'default' },
  { label: '深色主题', value: 'dark' },
];

/** 操作栏形态切换项：常驻在图表上方，或悬浮在图表右上角 */
const TOOLBAR_OPTIONS = [
  { label: '常驻操作栏', value: 'static' },
  { label: '悬浮操作栏', value: 'float' },
];

/** 示例页：左侧图表类型列表，右侧所选类型的示例画廊，宽屏一行两个 */
const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chartTypes = useMemo(() => listChartMetas().map((meta) => meta.type), []);
  // 地址栏参数是选中类型的唯一真源，刷新与分享都能保持当前类型
  const chartType = resolveChartType(searchParams.get('type'), chartTypes);
  const examples = chartExamples[chartType];
  // 头部标题取元数据里的中文名，避免在页面里硬编码类型名称
  const chartTypeName = useMemo(() => getChartMeta(chartType).name, [chartType]);
  // 卡片配置按示例 id 常驻，保存后切换类型再返回仍保留编辑结果
  const [configs, setConfigs] = useState<Record<string, ChartConfig>>(createExampleConfigMap);
  // 全局默认主题：切换后所有未显式传 theme 的图表同步重建
  const [theme, setTheme] = useState('default');
  // 操作栏形态：所有示例卡片同步切换，便于对比两种展示效果
  const [toolbarMode, setToolbarMode] = useState<ToolbarMode>('static');

  const handleTypeChange = useCallback(
    (type: ChartType) => {
      setSearchParams({ type });
    },
    [setSearchParams]
  );

  const handleChange = useCallback((id: string, config: ChartConfig) => {
    setConfigs((prev) => ({ ...prev, [id]: config }));
  }, []);

  const handleSave = useCallback((id: string, config: ChartConfig) => {
    setConfigs((prev) => ({ ...prev, [id]: config }));
    message.success('配置项已保存，可直接写入数据库');
  }, []);

  const handleReset = useCallback((id: string) => {
    setConfigs((prev) => ({ ...prev, [id]: getExampleInitialConfig(id) }));
  }, []);

  const handleThemeChange = useCallback((value: string | number) => {
    const next = String(value);
    setTheme(next);
    // 非深色时清除全局默认，回落为 ECharts 默认外观
    setDefaultTheme(next === 'dark' ? 'dark' : undefined);
  }, []);

  const handleToolbarModeChange = useCallback((value: string | number) => {
    setToolbarMode(String(value) as ToolbarMode);
  }, []);

  return (
    <div className="page_demo">
      <aside className="demo_side">
        <ChartTypePicker value={chartType} onChange={handleTypeChange} />
      </aside>
      <div className="demo_main">
        <div className="demo_header">
          <div className="demo_header__info">
            <h2 className="demo_header__title">{chartTypeName}</h2>
            <span className="demo_header__desc">共 {examples.length} 个示例，可直接编辑与导出</span>
          </div>
          <div className="demo_header__actions">
            <Segmented
              options={TOOLBAR_OPTIONS}
              value={toolbarMode}
              onChange={handleToolbarModeChange}
            />
            <Segmented options={THEME_OPTIONS} value={theme} onChange={handleThemeChange} />
          </div>
        </div>
        <div className="demo_grid">
          {examples.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              config={configs[example.id]}
              toolbarMode={toolbarMode}
              onChange={handleChange}
              onSave={handleSave}
              onReset={handleReset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
