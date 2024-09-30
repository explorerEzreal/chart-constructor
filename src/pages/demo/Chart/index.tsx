import React from 'react';
import { EChartsOption } from 'echarts';
import { Chart } from '@/chart-constructor/view';
import { Button, Flex } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Header } from '../components/Headerlayout';

import './index.less';

type SettingProps = {
  options: EChartsOption;
};
export const ChartView: React.FC<SettingProps> = (props) => {
  const HeaderBtns = () => {
    return (
      <Flex gap={8} style={{ paddingLeft: 24 }}>
        <Button type='primary' icon={<VerticalAlignBottomOutlined />}>
          下载示列
        </Button>
        <Button>截图分享</Button>
      </Flex>
    );
  };

  return (
    <div className='chart_view'>
      <Header>
        <HeaderBtns />
      </Header>
      <div className='chart_wrapper'>
        <Chart options={props.options} />
      </div>
    </div>
  );
};
