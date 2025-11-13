import type { FC } from 'react';
import { Button, Input, InputNumber } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DataMatrix, Field } from '../components';
import type { ChartDataItem, SettingItemProps } from '../../types';

export type PieDataFormProps = Pick<SettingItemProps, 'value' | 'onChange'>;

const PieDataSettingItem: FC<PieDataFormProps> = ({ value, onChange }) => {
  const list: ChartDataItem[] = value.list ?? [];
  const updateList = (nextList: ChartDataItem[]) => onChange({ name: 'list', payload: nextList });

  const updateItem = (index: number, key: 'name' | 'value', payload: string | number) => {
    const nextList = list.map((item, currentIndex) =>
      currentIndex === index ? { ...item, [key]: payload } : item
    );
    updateList(nextList);
  };

  const addItem = () => {
    updateList([...list, { name: `分类${list.length + 1}`, value: 0 }]);
  };

  const removeItem = (index: number) => {
    updateList(list.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <>
      <Field label="系列名称">
        <Input
          value={value.seriesName}
          onChange={(event) => onChange({ name: 'seriesName', payload: event.target.value })}
        />
      </Field>
      <Field label="数据列表" layout="block">
        <DataMatrix
          columns={[
            { label: '名称', variant: 'name' },
            { label: '数值', variant: 'value' },
            { variant: 'action' },
          ]}
        >
          {list.map((item, index) => (
            <div className="cc-data-list__row" key={`${item.name}-${index}`}>
              <Input
                value={item.name}
                placeholder="名称"
                onChange={(event) => updateItem(index, 'name', event.target.value)}
              />
              <InputNumber
                value={item.value}
                placeholder="数值"
                onChange={(number) => updateItem(index, 'value', number ?? 0)}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeItem(index)}
              />
            </div>
          ))}
        </DataMatrix>
        <div className="cc-data-matrix__actions">
          <Button type="dashed" block icon={<PlusOutlined />} onClick={addItem}>
            新增数据项
          </Button>
        </div>
      </Field>
    </>
  );
};

export default PieDataSettingItem;
