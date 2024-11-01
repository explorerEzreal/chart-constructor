import React from 'react';
import { EChartsOption } from 'echarts';
import { Chart } from '@/chart-constructor/view';
import { Button, Flex } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Header } from '../components/Headerlayout';
import html2canvas from 'html2canvas';

import './index.less';

type SettingProps = {
  options: EChartsOption;
};
export const ChartView: React.FC<SettingProps> = (props) => {

  const chartRef = React.useRef<HTMLDivElement>(null);
  const handleScreenshot = async () => {
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current);
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'chart-screenshot.png';
        link.click();
      } catch (error) {
        console.error('截图失败:', error);
      }
    }
  };

  const HeaderBtns = () => {
    return (
      <Flex gap={8} style={{ paddingLeft: 24 }}>
        <Button type='primary' icon={<VerticalAlignBottomOutlined />}>
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
