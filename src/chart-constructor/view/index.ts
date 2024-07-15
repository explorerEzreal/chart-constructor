import * as echarts from 'echarts';
import React, { useRef, createElement, useEffect, RefObject } from 'react';
import { EChartsOption, ECharts } from 'echarts';
import { useSize } from 'ahooks';

type Props = {
  option: EChartsOption;
};

export const Chart: React.FC<Props> = (Props) => {
  const entityClassname = 'chartview-wrapper';
  const { option } = Props;
  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const chartRef: RefObject<ECharts | null> = useRef<ECharts | null>(null);
  const chart: ECharts | null = chartRef.current;

  const size = useSize(ref);

  useEffect(() => {
    if (ref.current) {
      chartRef.current = echarts.init(ref.current);
      chartRef.current.setOption(option);
    }

    return () => {
      chart?.dispose();
    };
  }, [ref]);

  useEffect(() => {
    chart && chart.resize(size);
  }, [size]);

  return createElement('div', {
    className: entityClassname,
    style: {
      height: '100%',
      width: '100%',
    },
    ref,
  });
};
