import {
  CameraOutlined,
  CodeOutlined,
  CopyOutlined,
  DownloadOutlined,
  EditOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { ResolvedToolItem, ToolContext, ToolItem } from '../../types';

export const createBuiltinTools = (ctx: ToolContext): ToolItem[] => {
  const tools: ToolItem[] = [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined />,
      onClick: () => ctx.openEdit(),
    },
  ];

  // 仅数据源为取数函数时提供刷新入口，静态数据没有可刷新的内容
  if (ctx.canRefreshData) {
    tools.push({
      key: 'refreshData',
      label: '刷新数据',
      icon: <SyncOutlined />,
      onClick: () => ctx.refreshData(),
    });
  }

  tools.push(
    {
      key: 'copyConfig',
      label: '复制配置项',
      icon: <CopyOutlined />,
      onClick: () => ctx.copyConfig(),
    },
    {
      key: 'copyOption',
      label: '复制 Options',
      icon: <CodeOutlined />,
      onClick: () => ctx.copyOption(),
    },
    {
      key: 'downloadPng',
      label: '下载图片',
      icon: <DownloadOutlined />,
      onClick: () => ctx.downloadPng(),
    },
    {
      key: 'screenshot',
      label: '截图分享',
      icon: <CameraOutlined />,
      onClick: () => ctx.screenshot(),
    },
    {
      key: 'reset',
      label: '重置',
      icon: <ReloadOutlined />,
      onClick: () => ctx.reset(),
    },
  );

  return tools;
};

/** 合并内置工具与自定义工具：同 key 覆盖，新 key 追加，并绑定上下文 */
export const resolveTools = (
  tools: ToolItem[] | undefined,
  ctx: ToolContext
): ResolvedToolItem[] => {
  const builtinTools = createBuiltinTools(ctx);

  const merged = builtinTools.map((base) => {
    const custom = tools?.find((item) => item.key === base.key);
    if (!custom) {
      return base;
    }
    return {
      ...base,
      ...custom,
      onClick: custom.onClick ?? base.onClick,
    };
  });

  const builtinKeys = builtinTools.map((item) => item.key);
  const extraTools = (tools ?? []).filter((item) => !builtinKeys.includes(item.key));

  return [...merged, ...extraTools].map((item) => ({
    key: item.key,
    label: item.label,
    tooltip: item.tooltip,
    icon: item.icon,
    onClick: item.onClick ? () => item.onClick?.(ctx) : undefined,
  }));
};
