import React from 'react';
import { EChartsOption } from 'echarts';
import { Chart } from '@/chart-constructor/view';
import { Button, Flex } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Header } from '../components/Headerlayout';

import './index.less';

const option: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

type SettingProps = {
  [key: string]: string;
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
