import { useRef } from 'react';
import { Anchor, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CodeBlock, GuideSection } from '@/components';
import {
  configCode,
  exportGroups,
  guideSections,
  installCode,
  propRows,
  quickStartCode,
  structureRows,
  themeCode,
  toolsCode,
} from './constants';
import type { PropRow, StructureRow } from './constants';
import './index.less';

/** CEchart props 说明表列定义 */
const propColumns: TableColumnsType<PropRow> = [
  {
    title: '属性',
    dataIndex: 'prop',
    width: 190,
    render: (value: string) => <code>{value}</code>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 250,
    render: (value: string) => <code>{value}</code>,
  },
  {
    title: '默认值',
    dataIndex: 'defaultValue',
    width: 90,
    render: (value: string) => <code>{value}</code>,
  },
  { title: '说明', dataIndex: 'desc' },
];

/** 图表类型结构表列定义 */
const structureColumns: TableColumnsType<StructureRow> = [
  { title: '图表类型', dataIndex: 'type', width: 150, render: (value: string) => <b>{value}</b> },
  {
    title: 'data 结构',
    dataIndex: 'data',
    render: (value: string) => <code>{value}</code>,
  },
  { title: 'settings.series 专属字段', dataIndex: 'series' },
];

/** 指南页：CEchart 安装、用法、props 与配置结构的快速说明文档 */
const Index = () => {
  // 右侧内容区是页面唯一滚动容器，锚点滚动与高亮都基于它
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page_guide">
      <aside className="guide_side">
        <h2 className="guide_side__title">目录</h2>
        <Anchor
          className="guide_anchor"
          affix={false}
          replace
          targetOffset={16}
          style={{ maxHeight: 'none' }}
          getContainer={() => scrollRef.current ?? window}
          items={guideSections.map((section) => ({
            key: section.id,
            href: `#${section.id}`,
            title: section.title,
          }))}
        />
      </aside>
      <div className="guide_main" ref={scrollRef}>
        <header className="guide_header">
          <h1 className="guide_header__title">快速开始</h1>
          <p className="guide_header__desc">
            传入一段配置项 JSON 即可渲染图表，组件自带操作栏与配置抽屉；编辑只改草稿，点保存才通过回调
            输出最新配置项，可直接写入数据库。
          </p>
        </header>

        <GuideSection
          id="install"
          title="安装"
          desc="组件依赖 react、react-dom、echarts、antd，由使用方安装"
        >
          <CodeBlock title="终端" language="bash" code={installCode} />
        </GuideSection>

        <GuideSection
          id="quickstart"
          title="快速开始"
          desc="引入组件与样式，外层容器给定高度即可渲染；未传 value 时使用内置饼图默认配置"
        >
          <CodeBlock code={quickStartCode} />
        </GuideSection>

        <GuideSection id="props" title="组件 props" desc="CEchartProps 全部字段与默认值">
          <Table<PropRow>
            className="guide_table"
            rowKey="key"
            size="middle"
            pagination={false}
            columns={propColumns}
            dataSource={propRows}
          />
        </GuideSection>

        <GuideSection
          id="config"
          title="配置项结构"
          desc="ChartConfig 统一为 { version, type, data, settings }，切换类型时用 createDefaultConfig 生成默认配置"
        >
          <Table<StructureRow>
            className="guide_table"
            rowKey="key"
            size="middle"
            pagination={false}
            columns={structureColumns}
            dataSource={structureRows}
          />
          <p className="guide_tip">
            各类图表共用 settings.title、settings.legend、settings.label、settings.tooltip
            以及直角坐标系图表的 settings.xAxis、settings.yAxis。
          </p>
          <CodeBlock code={configCode} />
        </GuideSection>

        <GuideSection
          id="toolbar"
          title="自定义工具栏"
          desc="内置工具项：edit、copyConfig、copyOption、downloadPng、screenshot、reset"
        >
          <CodeBlock code={toolsCode} />
        </GuideSection>

        <GuideSection
          id="theme"
          title="主题"
          desc="主题复用 ECharts 原生机制，不进入 ChartConfig、不写入数据库"
        >
          <CodeBlock code={themeCode} />
        </GuideSection>

        <GuideSection id="exports" title="导出内容">
          <ul className="guide_exports">
            {exportGroups.map((group) => (
              <li key={group.label} className="guide_exports__item">
                <span className="guide_exports__label">{group.label}</span>
                <span className="guide_exports__value">{group.items}</span>
              </li>
            ))}
          </ul>
        </GuideSection>
      </div>
    </div>
  );
};

export default Index;
