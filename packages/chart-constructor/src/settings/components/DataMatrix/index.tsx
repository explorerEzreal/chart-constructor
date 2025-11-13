import type { FC, ReactNode } from 'react';

/** 矩阵列宽约定：名称列与数值列固定宽度，操作列与删除按钮对齐 */
export type DataMatrixColumn = {
  /** 列标题，留空时仅占位对齐 */
  label?: string;
  variant?: 'name' | 'value' | 'action';
  /** 悬停提示，长系列名截断后仍可查看完整内容 */
  title?: string;
};

export type DataMatrixProps = {
  columns: DataMatrixColumn[];
  /** 数据行，列宽与表头由样式约定统一 */
  children: ReactNode;
};

/** 数据矩阵：统一列宽的表头 + 横向滚动的数据行容器 */
export const DataMatrix: FC<DataMatrixProps> = ({ columns, children }) => (
  <div className="cc-data-matrix">
    <div className="cc-data-matrix__head">
      {columns.map((column, index) => (
        <span
          key={`${column.label ?? ''}-${index}`}
          className={['cc-data-matrix__cell', `is-${column.variant ?? 'value'}`].join(' ')}
          title={column.title}
        >
          {column.label}
        </span>
      ))}
    </div>
    {children}
  </div>
);
