import type { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import type { ToolbarProps } from './type';

/** 图表操作栏：tooltip 仅显式传入时生效，未传时保持无提示的原样渲染 */
export const Toolbar: FC<ToolbarProps> = ({ items, className }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={['cc-toolbar', className].filter(Boolean).join(' ')}>
      <Space size={2} wrap>
        {items.map((item) => (
          <Tooltip key={item.key} title={item.tooltip}>
            <Button
              type="text"
              size="small"
              icon={item.icon}
              aria-label={item.tooltip || item.label || undefined}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          </Tooltip>
        ))}
      </Space>
    </div>
  );
};
