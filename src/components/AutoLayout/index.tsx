import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSize } from 'ahooks';
import './index.less';

export type AutoLayoutProps = {
  right: React.ReactNode;
  left: React.ReactNode;
  widthRatio?: number; // 左边占的宽度比例，按10等分，10为百分百，默认为 7
};

const Index: React.FC<AutoLayoutProps> = (props) => {
  const { right, left, widthRatio = 7 } = props;

  const [leftWidth, setLeftWidth] = useState<number>();

  const wrapperRef = useRef(null);
  const size = useSize(wrapperRef);

  const rightMaxWidth = useMemo(() => {
    if (leftWidth && size?.width) {
      return size?.width - leftWidth - 15;
    }
    return 220;
  }, [leftWidth, size]);

  const handleMouseDown = (e: { preventDefault: () => void; clientX: number }) => {
    e.preventDefault();

    const startX = e.clientX;
    const doResize = (event: { clientX: number }) => {
      if (startX && leftWidth) {
        const width = leftWidth + event.clientX - startX;
        setLeftWidth(width);
      }
    };

    const stopResize = () => {
      document.documentElement.removeEventListener('mousemove', doResize, false);
      document.documentElement.removeEventListener('mouseup', stopResize, false);
    };

    document.documentElement.addEventListener('mousemove', doResize, false);
    document.documentElement.addEventListener('mouseup', stopResize, false);
  };

  useEffect(() => {
    if (size?.width) {
      const ratio = widthRatio <= 10 ? widthRatio : Number(widthRatio.toString()[0]);
      const width = Math.floor((size.width * ratio) / 10);
      setLeftWidth(width);
    }
  }, [widthRatio, size]);

  return (
    <div ref={wrapperRef} className="c_auto_layout">
      <div style={{ width: `${leftWidth}px` }} className="container">
        {left}
      </div>
      <div className="handler" onMouseDown={handleMouseDown} />
      <div style={{ flex: 1, maxWidth: `${rightMaxWidth}px` }} className="container">
        {right}
      </div>
    </div>
  );
};

export default Index;
