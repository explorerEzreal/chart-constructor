import React, { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { OverviewContextProvider } from './context';
import { ChartView } from './Chart';
import { Settings } from './Setting';

import './index.less';

const Index = () => {
  const [leftWidth, setLeftWidth] = useState('calc(50% - 7.5px)');
  const [rightWidth, setRightWidth] = useState('calc(50% - 7.5px)');

  const [options, setOptions] = useState();

  const leftRef = useRef(null);
  const size = useSize(leftRef);

  const handleMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = size?.width;

    const doResize = (event) => {
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

  const onChange = (e) => {
    console.log('-----Index----', e);
    setOptions(e);
  };

  console.log('-----options----', options)

  return (
    <OverviewContextProvider>
      <div className='page_demo'>
        <div
          ref={leftRef}
          style={{ width: leftWidth }}
          className='container left_chartContainer'
        >
          <ChartView options={options} />
        </div>
        <div className='handler' onMouseDown={handleMouseDown} />
        <div
          style={{ width: rightWidth }}
          className='container rignt_settingContainer'
        >
          <Settings onChange={onChange} options={options} />
        </div>
      </div>
    </OverviewContextProvider>
  );
};

export default Index;
