import React, { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { ChartView } from './Chart';
import { Settings } from './Setting';

import './index.less';

const Index = () => {
  const [leftWidth, setLeftWidth] = useState('calc(50% - 7.5px)');
  const [rightWidth, setRightWidth] = useState('calc(50% - 7.5px)');

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

  return (
    <div className='page_demo'>
      <div
        ref={leftRef}
        style={{ width: leftWidth }}
        className='container left_chartContainer'
      >
        <ChartView />
      </div>
      <div className='handler' onMouseDown={handleMouseDown} />
      <div
        style={{ width: rightWidth }}
        className='container rignt_settingContainer'
      >
        <Settings />
      </div>
    </div>
  );
};
export default Index;
