import * as echarts from 'echarts';
import React, { useRef, createElement, useEffect, RefObject } from 'react';
import { EChartsOption, ECharts } from 'echarts';
import { useSize } from 'ahooks';

type Props = {
  options: EChartsOption;
};

const Index: React.FC<Props> = (Props) => {
  const entityClassname = 'chartview-wrapper';
  const { options } = Props;
  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const chartRef: RefObject<ECharts | null> = useRef<ECharts | null>(null);
  const chart: ECharts | null = chartRef.current;

  const size = useSize(ref);

  useEffect(() => {
    if (ref.current) {
      chartRef.current = echarts.init(ref.current);
    }

    return () => {
      chartRef.current?.dispose();
    };
  }, [ref]);

  useEffect(() => {
    if (options && chartRef.current) {
      chartRef.current.setOption(options);
    }
  }, [options]);

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

export const Chart = React.memo(Index);
