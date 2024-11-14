import { EChartsOption } from 'echarts';
import { useEffect, useState } from 'react';

export type ChartValue = {
    options: EChartsOption
};

export type useChartsValue = {
  update: (v: ChartValue) => void;
};

type Params = {
  options: {
    id: string;
    get: (id: string) => ChartValue;
    set: (v: ChartValue, id: string) => void;
  };
};

export const useChartsValue = (params: Params) => {
  const { id, get, set } = params.options;

  const [chartValue, setChartValue] = useState<ChartValue | null>(null);

  const update = (v: ChartValue) => {
    setChartValue(v);
    set(v, id);
  };

  useEffect(() => {
    const v = get(id);
    setChartValue(v);
  }, [id]);

  return {
    chartValue,
    update,
  };
};
