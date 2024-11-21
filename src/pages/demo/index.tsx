import React, { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { ChartView } from './Chart';
import { Settings } from './Setting';

import './index.less';
import { useInit } from './Hooks/useInit';
import { ChartType } from '@/constructor/meats';

const Index = () => {
  const [leftWidth, setLeftWidth] = useState('calc(75% - 7.5px)');
  const [rightWidth, setRightWidth] = useState('calc(25% - 7.5px)');
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
        const leftWidth = startWidth + event.clientX - startX;
        const rightWidth = window.innerWidth - leftWidth - 15;

        setLeftWidth(`${leftWidth}px`);
        setRightWidth(`${rightWidth}px`);
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
        ref={leftRef}
        style={{ width: leftWidth }}
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
        style={{ width: rightWidth }}
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
