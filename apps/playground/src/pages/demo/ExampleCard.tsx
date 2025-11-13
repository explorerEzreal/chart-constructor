import { useMemo } from 'react';
import type { FC } from 'react';
import { CEchart } from 'react-chart-constructor';
import type { ChartConfig, ToolItem, ToolbarMode } from 'react-chart-constructor';
import type { ChartExample } from './examples';

/** 卡片图表区固定高度，保证两列布局下每行高度一致 */
const CHART_HEIGHT = 360;

/**
 * 工具栏只保留图标：清空内置项文字并用 tooltip 补名称
 * 静态示例的重置回到示例初始配置；带数据源的示例不覆盖 onClick，沿用内置重置以便重置后重新取数
 */
const createCardTools = (onReset: () => void, hasDataSource: boolean): ToolItem[] => [
  { key: 'edit', label: '', tooltip: '编辑' },
  // 数据源卡片补一个图标态刷新项（不覆盖 onClick，沿用内置取数逻辑）
  ...(hasDataSource ? [{ key: 'refreshData', label: '', tooltip: '刷新数据' }] : []),
  { key: 'copyConfig', label: '', tooltip: '复制配置项' },
  { key: 'copyOption', label: '', tooltip: '复制 Options' },
  { key: 'downloadPng', label: '', tooltip: '下载图片' },
  { key: 'screenshot', label: '', tooltip: '截图分享' },
  hasDataSource
    ? { key: 'reset', label: '', tooltip: '重置' }
    : { key: 'reset', label: '', tooltip: '重置', onClick: onReset },
];

export type ExampleCardProps = {
  example: ChartExample;
  config: ChartConfig;
  toolbarMode: ToolbarMode;
  onChange: (id: string, config: ChartConfig) => void;
  onSave: (id: string, config: ChartConfig) => void;
  /** 点击重置时回到示例初始配置 */
  onReset: (id: string) => void;
};

const ExampleCard: FC<ExampleCardProps> = ({
  example,
  config,
  toolbarMode,
  onChange,
  onSave,
  onReset,
}) => {
  const tools = useMemo(
    () => createCardTools(() => onReset(example.id), Boolean(example.data)),
    [example.id, example.data, onReset]
  );

  return (
    <article className="demo_card">
      <div className="demo_card__header">{example.title}</div>
      <CEchart
        value={config}
        data={example.data}
        height={CHART_HEIGHT}
        toolbarMode={toolbarMode}
        tools={tools}
        onChange={(next) => onChange(example.id, next)}
        onSave={(next) => onSave(example.id, next)}
      />
    </article>
  );
};

export default ExampleCard;
