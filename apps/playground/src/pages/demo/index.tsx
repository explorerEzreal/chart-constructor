import { useCallback, useMemo, useState } from 'react';
import { message, Typography } from 'antd';
import { CEchart, createDefaultConfig } from 'chart-constructor';
import type { ChartConfig } from 'chart-constructor';
import './index.less';

const { Paragraph, Text } = Typography;

/** 示例页：演示配置项回显、实时编辑与保存回调 */
const Index = () => {
  const initialConfig = useMemo(() => createDefaultConfig('pie'), []);
  const [liveConfig, setLiveConfig] = useState<ChartConfig>(initialConfig);
  const [savedAt, setSavedAt] = useState('');

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
          value={initialConfig}
          height="100%"
          onChange={handleChange}
          onSave={handleSave}
        />
      </div>
      <aside className="demo_panel">
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
