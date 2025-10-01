import type { ResolvedToolItem } from '../../types';

export type ToolbarProps = {
  /** 已绑定上下文的工具项 */
  items: ResolvedToolItem[];
  className?: string;
};
