import { useCallback, useState } from 'react';
import { message, Segmented, Typography } from 'antd';
import { CEchart, createDefaultConfig } from 'chart-constructor';
import type { ChartConfig, ChartType } from 'chart-constructor';
import './index.less';

const { Paragraph, Text } = Typography;

const TYPE_OPTIONS = [
  { label: '饼图', value: 'pie' },
  { label: '柱状图', value: 'bar' },
];

/** 示例页：演示配置项回显、实时编辑与保存回调 */
const Index = () => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [liveConfig, setLiveConfig] = useState<ChartConfig>(() => createDefaultConfig('pie'));
  const [savedAt, setSavedAt] = useState('');

  // 切换图表类型时按目标类型重建默认配置
  const handleTypeChange = useCallback((type: ChartType) => {
    setChartType(type);
    setLiveConfig(createDefaultConfig(type));
  }, []);

  const handleChange = useCallback((config: ChartConfig) => {
    setLiveConfig(config);
  }, []);

  const handleSave = useCallback((config: ChartConfig) => {
    setLiveConfig(config);
    setSavedAt(new Date().toLocaleTimeString('zh-CN'));
    message.success('配置项已保存，可直接写入数据库');
  }, []);

  return (
    <div className="page_demo">
      <div className="demo_chart">
        <CEchart
          value={liveConfig}
          height="100%"
          onChange={handleChange}
          onSave={handleSave}
        />
      </div>
      <aside className="demo_panel">
        <Segmented
          block
          value={chartType}
          options={TYPE_OPTIONS}
          onChange={(value) => handleTypeChange(value as ChartType)}
        />
        <Paragraph className="demo_panel__tip">
          点击操作栏“编辑”打开配置抽屉，表单变更会实时渲染；点击“保存”后 `onSave` 输出可直接入库的配置项
          JSON。
        </Paragraph>
        <Text type="secondary">{savedAt ? `最近保存：${savedAt}` : '尚未保存'}</Text>
        <pre className="demo_panel__json">{JSON.stringify(liveConfig, null, 2)}</pre>
      </aside>
    </div>
  );
};

export default Index;
