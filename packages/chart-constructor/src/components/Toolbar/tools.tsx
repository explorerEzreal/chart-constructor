import {
  CameraOutlined,
  CodeOutlined,
  CopyOutlined,
  DownloadOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ResolvedToolItem, ToolContext, ToolItem } from '../../types';

/** 内置工具项定义 */
export const createBuiltinTools = (ctx: ToolContext): ToolItem[] => [
  {
    key: 'edit',
    label: '编辑',
    icon: <EditOutlined />,
    onClick: () => ctx.openEdit(),
  },
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
];

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
