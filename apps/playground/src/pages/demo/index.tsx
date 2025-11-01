import { useCallback, useMemo, useState } from 'react';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { listChartMetas } from 'chart-constructor';
import type { ChartConfig, ChartType } from 'chart-constructor';
import { ChartTypePicker } from '@/components';
import ExampleCard from './ExampleCard';
import { chartExamples, createExampleConfigMap, getExampleInitialConfig } from './examples';
import './index.less';

/** 校验地址栏中的类型参数，非法值回退到首个注册类型 */
const resolveChartType = (value: string | null, types: ChartType[]): ChartType =>
  types.includes(value as ChartType) ? (value as ChartType) : types[0];

/** 示例页：左侧图表类型列表，右侧所选类型的示例画廊，宽屏一行四个 */
const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chartTypes = useMemo(() => listChartMetas().map((meta) => meta.type), []);
  // 地址栏参数是选中类型的唯一真源，刷新与分享都能保持当前类型
  const chartType = resolveChartType(searchParams.get('type'), chartTypes);
  const examples = chartExamples[chartType];
  // 卡片配置按示例 id 常驻，切换类型后返回仍保留编辑结果
  const [configs, setConfigs] = useState<Record<string, ChartConfig>>(createExampleConfigMap);

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

  return (
    <div className="page_demo">
      <aside className="demo_side">
        <ChartTypePicker value={chartType} onChange={handleTypeChange} />
      </aside>
      <div className="demo_main">
        <div className="demo_grid">
          {examples.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              config={configs[example.id]}
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
