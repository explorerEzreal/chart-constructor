import type { FC } from 'react';
import { Button, Input, InputNumber, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DataMatrix, Field } from '../components';
import type { ComboChartSeries, SettingItemProps } from '../../types';

export type ComboDataFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

/** 折线柱状图系列渲染形态选项 */
const SERIES_TYPE_OPTIONS = [
  { label: '柱状', value: 'bar' },
  { label: '折线', value: 'line' },
];

/** 折线柱状图数据表单：分类（行）与系列（列）二维编辑，系列可切换柱状/折线 */
const ComboDataSettingItem: FC<ComboDataFormProps> = ({ value, onChange }) => {
  const categories: string[] = value.categories ?? [];
  const series: ComboChartSeries[] = value.series ?? [];
  const updateCategories = (next: string[]) => onChange({ name: 'categories', payload: next });
  const updateSeries = (next: ComboChartSeries[]) => onChange({ name: 'series', payload: next });

  // 分类增删改需要同步维护各系列的数据长度
  const updateCategory = (index: number, name: string) => {
    updateCategories(categories.map((item, current) => (current === index ? name : item)));
  };
  const addCategory = () => {
    updateCategories([...categories, `分类${categories.length + 1}`]);
    updateSeries(series.map((item) => ({ ...item, data: [...item.data, 0] })));
  };
  const removeCategory = (index: number) => {
    updateCategories(categories.filter((_, current) => current !== index));
    updateSeries(
      series.map((item) => ({
        ...item,
        data: item.data.filter((_, current) => current !== index),
      }))
    );
  };

  const updateSeriesName = (index: number, name: string) => {
    updateSeries(series.map((item, current) => (current === index ? { ...item, name } : item)));
  };
  const updateSeriesType = (index: number, type: ComboChartSeries['type']) => {
    updateSeries(series.map((item, current) => (current === index ? { ...item, type } : item)));
  };
  const updateValue = (seriesIndex: number, categoryIndex: number, payload: number) => {
    updateSeries(
      series.map((item, current) =>
        current === seriesIndex
          ? {
              ...item,
              data: item.data.map((valueItem, dataIndex) =>
                dataIndex === categoryIndex ? payload : valueItem
              ),
            }
          : item
      )
    );
  };
  const addSeries = () => {
    updateSeries([
      ...series,
      {
        name: `系列${series.length + 1}`,
        type: series.length % 2 === 0 ? 'bar' : 'line',
        data: categories.map(() => 0),
      },
    ]);
  };
  const removeSeries = (index: number) => {
    updateSeries(series.filter((_, current) => current !== index));
  };

  return (
    <>
      <Field label="系列" layout="block">
        <div className="cc-data-list">
          {series.map((item, index) => (
            <div className="cc-data-list__row" key={`${item.name}-${index}`}>
              <Select
                style={{ width: 88 }}
                options={SERIES_TYPE_OPTIONS}
                value={item.type}
                onChange={(type) => updateSeriesType(index, type as ComboChartSeries['type'])}
              />
              <Input
                value={item.name}
                placeholder="系列名称"
                onChange={(event) => updateSeriesName(index, event.target.value)}
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
      <Field label="分类数据" layout="block">
        <DataMatrix
          columns={[
            { label: '分类', variant: 'name' },
            ...series.map((item) => ({ label: item.name, variant: 'value' as const, title: item.name })),
            { variant: 'action' },
          ]}
        >
          {categories.map((item, categoryIndex) => (
            <div className="cc-data-list__row" key={`${item}-${categoryIndex}`}>
              <Input
                value={item}
                placeholder="分类名称"
                onChange={(event) => updateCategory(categoryIndex, event.target.value)}
              />
              {series.map((seriesItem, seriesIndex) => (
                <InputNumber
                  key={seriesItem.name + seriesIndex}
                  value={seriesItem.data[categoryIndex] ?? 0}
                  placeholder="数值"
                  onChange={(number) => updateValue(seriesIndex, categoryIndex, number ?? 0)}
                />
              ))}
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeCategory(categoryIndex)}
              />
            </div>
          ))}
        </DataMatrix>
        <div className="cc-data-matrix__actions">
          <Button type="dashed" block icon={<PlusOutlined />} onClick={addCategory}>
            新增分类
          </Button>
        </div>
      </Field>
    </>
  );
};

export default ComboDataSettingItem;
