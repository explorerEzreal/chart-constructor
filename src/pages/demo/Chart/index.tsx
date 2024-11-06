import React from 'react';
import { EChartsOption } from 'echarts';
import { Chart } from '@/chart-constructor/view';
import { Button, Flex } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Header } from '../components/Headerlayout';
import { captureScreenshot, copyToClipboard } from '@shard/utils/index';

import './index.less';

type SettingProps = {
  options: EChartsOption;
};
export const ChartView: React.FC<SettingProps> = (props) => {
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
        <Button
          type='primary'
          onClick={handle}
          icon={<VerticalAlignBottomOutlined />}
        >
          下载示列
        </Button>
        <Button onClick={handleScreenshot}>截图分享</Button>
      </Flex>
    );
  };

  return (
    <div className='chart_view'>
      <Header>
        <HeaderBtns />
      </Header>
      <div className='chart_wrapper' ref={chartRef}>
        <Chart options={props.options} />
      </div>
    </div>
  );
};
