import React, { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { ChartView } from './Chart';
import { Settings } from './Setting';
import ViewSetting from './ViewSetting';

import './index.less';
import { useInit } from './Hooks/useInit';
import { ChartType } from '@/constructor/meats';

const Index = () => {
  const [contentWidth, setcontentWidth] = useState('calc(75% - 7.5px)');
  const [sideWidth, setsideWidth] = useState('calc(25% - 7.5px)');
  const [chartType, setChartType] = useState<ChartType>('pie');

  const {
    itemsList: items,
    options,
    onBack,
    backDisabled,
    onReset,
  } = useInit(chartType);

  const leftRef = useRef(null);
  const size = useSize(leftRef);

  const handleMouseDown = (e: {
    preventDefault: () => void;
    clientX: number;
  }) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = size?.width;

    const doResize = (event: { clientX: number }) => {
      if (startX && startWidth) {
        const contentWidth = startWidth + event.clientX - startX;
        const sideWidth = window.innerWidth - contentWidth - contentWidth - 15;

        setcontentWidth(`${contentWidth}px`);
        setsideWidth(`${sideWidth}px`);
      }
    };

    const stopResize = () => {
      document.documentElement.removeEventListener(
        'mousemove',
        doResize,
        false
      );
      document.documentElement.removeEventListener(
        'mouseup',
        stopResize,
        false
      );
    };

    document.documentElement.addEventListener('mousemove', doResize, false);
    document.documentElement.addEventListener('mouseup', stopResize, false);
  };

  return (
    <div className='page_demo'>
      <div
        style={{ width: sideWidth }}
        className='container'
      >
          <ViewSetting></ViewSetting>
      </div>

      <div
        ref={leftRef}
        style={{ width: contentWidth }}
        className='container left_chartContainer'
      >
        <ChartView
          chartType={chartType}
          options={options}
          onChartTypeChange={setChartType}
        />
      </div>
      <div className='handler' onMouseDown={handleMouseDown} />
      <div
        style={{ width: sideWidth }}
        className='container rignt_settingContainer'
      >
        <Settings
          items={items}
          onBack={onBack}
          backDisabled={backDisabled}
          onReset={onReset}
        />
      </div>
    </div>
  );
};

export default Index;
