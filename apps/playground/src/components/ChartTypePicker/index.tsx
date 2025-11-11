import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { listChartMetas } from 'react-chart-constructor';
import type { ChartType } from 'react-chart-constructor';
import './index.less';

/** 图表类型与图标的映射，未登记的类型回退到通用图标 */
const TYPE_ICONS: Partial<Record<ChartType, ReactNode>> = {
  pie: <PieChartOutlined />,
  bar: <BarChartOutlined />,
  line: <LineChartOutlined />,
  scatter: <DotChartOutlined />,
  combo: <AreaChartOutlined />,
};

export type ChartTypePickerProps = {
  /** 当前选中的图表类型 */
  value: ChartType;
  /** 选中新类型时触发 */
  onChange: (type: ChartType) => void;
};

/** 图表类型列表：参照 ECharts 官网左侧分类的纵向列表，按注册顺序排列 */
export const ChartTypePicker: FC<ChartTypePickerProps> = ({ value, onChange }) => {
  const metas = useMemo(() => listChartMetas(), []);

  return (
    <nav className="cc-type-picker">
      <h3 className="cc-type-picker__title">图表类型</h3>
      <div className="cc-type-picker__list">
        {metas.map((meta) => (
          <button
            key={meta.type}
            type="button"
            className={
              meta.type === value
                ? 'cc-type-picker__item is-active'
                : 'cc-type-picker__item'
            }
            onClick={() => onChange(meta.type)}
          >
            <span className="cc-type-picker__icon">
              {TYPE_ICONS[meta.type] ?? <AppstoreOutlined />}
            </span>
            <span className="cc-type-picker__name">{meta.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ChartTypePicker;
