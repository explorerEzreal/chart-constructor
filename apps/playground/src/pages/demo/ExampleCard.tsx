import { useMemo } from 'react';
import type { FC } from 'react';
import { CEchart } from 'chart-constructor';
import type { ChartConfig, ToolItem, ToolbarMode } from 'chart-constructor';
import type { ChartExample } from './examples';

/** 卡片图表区固定高度，保证两列布局下每行高度一致 */
const CHART_HEIGHT = 360;

/** 工具栏只保留图标：清空内置项文字并用 tooltip 补名称，交互仍走内置逻辑（重置项除外） */
const createCardTools = (onReset: () => void): ToolItem[] => [
  { key: 'edit', label: '', tooltip: '编辑' },
  { key: 'copyConfig', label: '', tooltip: '复制配置项' },
  { key: 'copyOption', label: '', tooltip: '复制 Options' },
  { key: 'downloadPng', label: '', tooltip: '下载图片' },
  { key: 'screenshot', label: '', tooltip: '截图分享' },
  { key: 'reset', label: '', tooltip: '重置', onClick: onReset },
];

export type ExampleCardProps = {
  /** 当前渲染的示例定义 */
  example: ChartExample;
  /** 该示例的实时配置项 */
  config: ChartConfig;
  /** 操作栏形态，常驻或悬浮 */
  toolbarMode: ToolbarMode;
  /** 编辑过程中输出最新配置项 */
  onChange: (id: string, config: ChartConfig) => void;
  /** 点击保存时输出最新配置项 */
  onSave: (id: string, config: ChartConfig) => void;
  /** 点击重置时回到示例初始配置 */
  onReset: (id: string) => void;
};

/** 示例卡片：上方图标工具栏 + 图表 + 下方示例名称 */
const ExampleCard: FC<ExampleCardProps> = ({
  example,
  config,
  toolbarMode,
  onChange,
  onSave,
  onReset,
}) => {
  const tools = useMemo(() => createCardTools(() => onReset(example.id)), [example.id, onReset]);

  return (
    <article className="demo_card">
      <div className="demo_card__header">{example.title}</div>
      <CEchart
        value={config}
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
