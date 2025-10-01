import type { FC } from 'react';
import { Button, Space } from 'antd';
import type { ToolbarProps } from './type';

/** 图表操作栏 */
export const Toolbar: FC<ToolbarProps> = ({ items, className }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={['cc-toolbar', className].filter(Boolean).join(' ')}>
      <Space size={4} wrap>
        {items.map((item) => (
          <Button key={item.key} type="text" size="small" icon={item.icon} onClick={item.onClick}>
            {item.label}
          </Button>
        ))}
      </Space>
    </div>
  );
};
