import React from 'react';
import meats, { ChartType } from '@/constructor/meats';
import { EChartsOption } from 'echarts';
import { Chart } from '@/constructor/view';
import { Button, Flex, Select } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Header } from '../components/Headerlayout';
import { captureScreenshot, copyToClipboard } from '@/shard/utils/index';

import './index.less';
import useConfirm from '../Hooks/useConfirm';

type SettingProps = {
  options: EChartsOption;
  chartType: ChartType;
  onChartTypeChange: (chart: ChartType) => void;
};

const chartOptions = Object.values(meats).map((m) => ({
  value: m.type,
  label: m.name,
}));

export const ChartView: React.FC<SettingProps> = (props) => {
  const { options, chartType, onChartTypeChange } = props;

  const { handleConfirm: onChange } = useConfirm(onChartTypeChange, {
    title: '是否切换图表类型',
    content: '当前修改将不会保存',
    okText: '确认',
    cancelText: '取消',
  });

  const chartRef = React.useRef<HTMLDivElement>(null);
  const handleScreenshot = () => {
    if (chartRef.current) {
      captureScreenshot(chartRef.current, 'chart-screenshot.png');
    }
  };

  const handle = () => {
    const optionsString = `option = ${JSON.stringify(props.options, null, 2)}`;
    copyToClipboard(optionsString);
  };

  const HeaderBtns = () => {
    return (
      <Flex gap={8} style={{ paddingLeft: 24 }}>
        <Button type="primary" onClick={handle} icon={<VerticalAlignBottomOutlined />}>
          下载示列
        </Button>
        <Button onClick={handleScreenshot}>截图分享</Button>
        <Select value={chartType} options={chartOptions} onChange={onChange} />
      </Flex>
    );
  };

  return (
    <div className="chart_view">
      <Header>
        <HeaderBtns />
      </Header>
      <div className="chart_wrapper" ref={chartRef}>
        <Chart chartType={chartType} options={options} />
      </div>
    </div>
  );
};
