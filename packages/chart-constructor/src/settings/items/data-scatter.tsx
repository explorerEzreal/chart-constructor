import type { FC } from 'react';
import { Button, Input, InputNumber } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DataMatrix, Field } from '../components';
import type { ScatterChartSeries, SettingItemProps } from '../../types';

export type ScatterDataFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

const ScatterDataSettingItem: FC<ScatterDataFormProps> = ({ value, onChange }) => {
  const series: ScatterChartSeries[] = value.series ?? [];
  const updateSeries = (next: ScatterChartSeries[]) =>
    onChange({ name: 'series', payload: next });

  const updateName = (index: number, name: string) => {
    updateSeries(series.map((item, current) => (current === index ? { ...item, name } : item)));
  };
  const addSeries = () => {
    updateSeries([...series, { name: `系列${series.length + 1}`, data: [[0, 0]] }]);
  };
  const removeSeries = (index: number) => {
    updateSeries(series.filter((_, current) => current !== index));
  };

  // 数据点按 [x, y] 数值对存储，按坐标轴分别写回
  const updatePoint = (seriesIndex: number, pointIndex: number, axis: 0 | 1, payload: number) => {
    updateSeries(
      series.map((item, current) =>
        current === seriesIndex
          ? {
              ...item,
              data: item.data.map((point, dataIndex) =>
                dataIndex === pointIndex
                  ? axis === 0
                    ? [payload, point[1]]
                    : [point[0], payload]
                  : point
              ) as [number, number][],
            }
          : item
      )
    );
  };
  const addPoint = (seriesIndex: number) => {
    updateSeries(
      series.map((item, current) =>
        current === seriesIndex ? { ...item, data: [...item.data, [0, 0]] } : item
      )
    );
  };
  const removePoint = (seriesIndex: number, pointIndex: number) => {
    updateSeries(
      series.map((item, current) =>
        current === seriesIndex
          ? { ...item, data: item.data.filter((_, dataIndex) => dataIndex !== pointIndex) }
          : item
      )
    );
  };

  return (
    <>
      <Field label="系列" layout="block">
        <div className="cc-data-list">
          {series.map((item, index) => (
            <div className="cc-data-list__row" key={`${item.name}-${index}`}>
              <Input
                value={item.name}
                placeholder="系列名称"
                onChange={(event) => updateName(index, event.target.value)}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                disabled={series.length <= 1}
                onClick={() => removeSeries(index)}
              />
            </div>
          ))}
          <Button type="dashed" block icon={<PlusOutlined />} onClick={addSeries}>
            新增系列
          </Button>
        </div>
      </Field>
      {series.map((item, seriesIndex) => (
        <Field
          label={`${item.name || `系列${seriesIndex + 1}`} 数据点`}
          layout="block"
          key={`point-${seriesIndex}`}
        >
          <DataMatrix
            columns={[
              { label: 'X', variant: 'value' },
              { label: 'Y', variant: 'value' },
              { variant: 'action' },
            ]}
          >
            {item.data.map((point, pointIndex) => (
              <div className="cc-data-list__row" key={`${point[0]}-${point[1]}-${pointIndex}`}>
                <InputNumber
                  value={point[0]}
                  placeholder="X"
                  onChange={(number) => updatePoint(seriesIndex, pointIndex, 0, number ?? 0)}
                />
                <InputNumber
                  value={point[1]}
                  placeholder="Y"
                  onChange={(number) => updatePoint(seriesIndex, pointIndex, 1, number ?? 0)}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removePoint(seriesIndex, pointIndex)}
                />
              </div>
            ))}
          </DataMatrix>
          <div className="cc-data-matrix__actions">
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => addPoint(seriesIndex)}
            >
              新增数据点
            </Button>
          </div>
        </Field>
      ))}
    </>
  );
};

export default ScatterDataSettingItem;
