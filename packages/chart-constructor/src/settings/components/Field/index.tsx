import type { FC, ReactNode } from 'react';

export type FieldProps = {
  label: string;
  children: ReactNode;
};

/** 表单项通用布局：左侧标签 + 右侧控件 */
export const Field: FC<FieldProps> = ({ label, children }) => (
  <div className="cc-field">
    <span className="cc-field__label">{label}</span>
    <div className="cc-field__control">{children}</div>
  </div>
);
