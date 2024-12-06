import React, { useState } from 'react';
import { ChartView } from './Chart';
import { Settings } from './Setting';
import ViewSetting from './ViewSetting';
import AutoLayout from '@/components/AutoLayout';

import './index.less';
import { useInit } from './Hooks/useInit';
import { ChartType } from '@/constructor/meats';

const Index = () => {
  const [chartType, setChartType] = useState<ChartType>('pie');

  const { itemsList: items, options, onBack, backDisabled, onReset } = useInit(chartType);

  return (
    <div className="page_demo">
      <div className="action_wrapper">
        <ViewSetting />
      </div>
      <div className="chart_setting_wrapper">
        <AutoLayout
          right={<Settings items={items} onBack={onBack} backDisabled={backDisabled} onReset={onReset} />}
          left={<ChartView chartType={chartType} options={options} onChartTypeChange={setChartType} />}
        />
      </div>
    </div>
  );
};

export default Index;
