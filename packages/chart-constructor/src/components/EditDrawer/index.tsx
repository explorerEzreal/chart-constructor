import type { FC } from 'react';
import { Button, Collapse, Drawer, Space } from 'antd';
import { settingItems } from '../../settings/items';
import type { ChartConfig, SettingChangeEvent, SettingItemKey } from '../../types';

export type EditDrawerProps = {
  open: boolean;
  /** 当前配置项，抽屉内表单实时联动 */
  config: ChartConfig;
  /** 表单块展示顺序 */
  settingKeys: SettingItemKey[];
  onChange: (event: SettingChangeEvent) => void;
  onSave: () => void;
  onCancel: () => void;
};

/** 图表配置编辑抽屉 */
export const EditDrawer: FC<EditDrawerProps> = ({
  open,
  config,
  settingKeys,
  onChange,
  onSave,
  onCancel,
}) => {
  const items = settingKeys.map((key) => {
    const settingItem = settingItems[key];
    const SettingComponent = settingItem.component;
    const value = key === 'data' ? config.data : config.settings[key];

    return {
      key,
      label: settingItem.title,
      children: (
        <SettingComponent value={value} onChange={(event) => onChange({ field: key, ...event })} />
      ),
    };
  });

  return (
    <Drawer
      open={open}
      title="编辑图表配置"
      placement="right"
      width={420}
      onClose={onCancel}
      footer={
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
        </Space>
      }
    >
      <Collapse items={items} defaultActiveKey={settingKeys} bordered={false} />
    </Drawer>
  );
};
