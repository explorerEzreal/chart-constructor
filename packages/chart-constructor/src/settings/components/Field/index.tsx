import type { FC, ReactNode } from 'react';

export type FieldProps = {
  label: string;
  /** 标签排布：inline 标签在左，block 标签在上（适合表格类宽控件） */
  layout?: 'inline' | 'block';
  children: ReactNode;
};

/** 表单项通用布局：标签在左或在上，右侧/下方为控件 */
export const Field: FC<FieldProps> = ({ label, layout = 'inline', children }) => (
  <div className={['cc-field', layout === 'block' ? 'cc-field--block' : ''].filter(Boolean).join(' ')}>
    <span className="cc-field__label">{label}</span>
    <div className="cc-field__control">{children}</div>
  </div>
);
