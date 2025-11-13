import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Button, Collapse, Drawer, Space, Tabs } from 'antd';
import type { EChartsOption } from 'echarts';
import { ChartView } from '../ChartView';
import { settingGroups, settingItems } from '../../settings/items';
import { getSettingValue } from '../../utils/config';
import type {
  ChartConfig,
  ChartTheme,
  SettingChangeEvent,
  SettingItemKey,
} from '../../types';

export type EditDrawerProps = {
  open: boolean;
  /** 编辑中的草稿配置项，抽屉内表单实时联动 */
  config: ChartConfig;
  /** 表单块展示顺序 */
  settingKeys: SettingItemKey[];
  /** 草稿对应的图表配置，仅在传入时展示顶部实时预览 */
  option?: EChartsOption;
  /** 预览图主题，未传入时使用全局默认主题 */
  theme?: ChartTheme;
  onChange: (event: SettingChangeEvent) => void;
  onSave: () => void;
  onCancel: () => void;
};

/** 图表配置编辑抽屉：左侧内嵌实时预览，右侧为配置表单 */
export const EditDrawer: FC<EditDrawerProps> = ({
  open,
  config,
  settingKeys,
  option,
  theme,
  onChange,
  onSave,
  onCancel,
}) => {
  // 按分组收敛表单块，空分组（如饼图无坐标轴与系列样式）自动隐藏
  const groups = useMemo(
    () =>
      settingGroups
        .map((group) => ({
          key: group.key,
          title: group.title,
          keys: settingKeys.filter((key) => group.items.includes(key)),
        }))
        .filter((group) => group.keys.length > 0),
    [settingKeys]
  );
  const [activeKey, setActiveKey] = useState(() => groups[0]?.key ?? '');

  // 可见分组变化（切换图表类型）后当前选中项失效时，回落首个分组
  useEffect(() => {
    if (!groups.some((group) => group.key === activeKey)) {
      setActiveKey(groups[0]?.key ?? '');
    }
  }, [groups, activeKey]);

  const renderSettingItem = (key: SettingItemKey) => {
    const settingItem = settingItems[key];
    const SettingComponent = settingItem.component;
    return {
      key,
      label: settingItem.title,
      children: (
        <SettingComponent
          chartType={config.type}
          value={getSettingValue(config, key)}
          onChange={(event) => onChange({ field: key, ...event })}
        />
      ),
    };
  };

  // 分组内保留折叠区块，默认全部展开
  const tabItems = groups.map((group) => ({
    key: group.key,
    label: group.title,
    children: (
      <Collapse
        items={group.keys.map(renderSettingItem)}
        defaultActiveKey={group.keys}
        bordered={false}
      />
    ),
  }));
  // 仅有草稿配置时才分栏，未传 option 时表单占满抽屉
  const showChart = open && Boolean(option);

  return (
    <Drawer
      open={open}
      title="编辑图表配置"
      placement="right"
      width={960}
      rootClassName="cc-edit-drawer"
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
      <div
        className={['cc-edit-drawer__body', showChart ? 'is-split' : ''].filter(Boolean).join(' ')}
      >
        {/* 预览图只渲染图表本身，不挂操作栏；抽屉关闭即销毁实例 */}
        {open && option ? (
          <div className="cc-edit-drawer__chart">
            {/* 预览框限制宽高比，避免窄长容器下饼图外标签被裁 */}
            <div className="cc-edit-drawer__chart-box">
              <ChartView option={option} theme={theme} />
            </div>
          </div>
        ) : null}
        <div className="cc-edit-drawer__form">
          <Tabs
            className="cc-edit-drawer__tabs"
            items={tabItems}
            activeKey={activeKey}
            onChange={setActiveKey}
          />
        </div>
      </div>
    </Drawer>
  );
};
