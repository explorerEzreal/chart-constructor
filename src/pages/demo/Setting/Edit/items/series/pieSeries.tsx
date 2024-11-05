import React, { useEffect, useState } from 'react';
// import { Input, Select, ColorPicker, InputNumber, Switch } from 'antd';
import { ItemProps } from '../../../../Hooks/useInit';
import { EChartsOption } from 'echarts';
import {
  Col,
  ColorPicker,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from 'antd';
import { get, isArray } from 'lodash';
import { useSetState } from 'ahooks';

const radiusOptions = [
  {
    label: '普通',
    value: 'common',
  },
  {
    label: '环形',
    value: 'ring',
  },
];

export type FieldKey = 'pieSeries';

type Props = ItemProps<FieldKey>;

export type Event = {
  field: 'pieSeries';
  payload: ItemProps<'pieSeries'>['value'];
};



type RadiusValue = Pick<Props['value'], 'type' | 'radius'>;

interface RadiusProps extends RadiusValue {
  onChange: (value: RadiusValue) => void;
}

function Radius(props: RadiusProps) {
  const { type, radius, onChange } = props;

  const [current, setCurrent] = useSetState<RadiusValue>({ type, radius });

  const onTypeChange = (e: RadioChangeEvent) => {
    const v = e.target.value;

    if (v === 'ring') {
      onChange({ type: v, radius: [50, 60] });
    } else {
      onChange({ type: v, radius: 50 });
    }
  };

  useEffect(() => {
    setCurrent({
      type,
      radius,
    });
  }, [type, radius]);

  return (
    <div>
      <Radio.Group
        value={type}
        options={radiusOptions}
        onChange={onTypeChange}
      />
      {type === 'common' ? (
        <InputNumber
          max={100}
          min={10}
          onChange={(e) => onChange({ ...current, radius: e as number })}
          formatter={(value) => `${value}%`}
          parser={(value) => value?.replace('%', '') as unknown as number}
          value={current.radius as number}
        />
      ) : (
        <Space>
          <InputNumber
            onChange={(e) =>
              onChange({
                ...current,
                radius: [e as number, (current.radius as number[])[1]],
              })
            }
            value={(current.radius as number[])[0]}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '') as unknown as number}
          />
          <InputNumber
            onChange={(e) =>
              onChange({
                ...current,
                radius: [(current.radius as number[])[0], e as number],
              })
            }
            value={(current.radius as number[])[1]}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '') as unknown as number}
          />
        </Space>
      )}
    </div>
  );
}

export const component: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { type, radius, itemStyle } = value;

  const onFieldChange = (v: Partial<Props['value']>) => {
    onChange({
      field: 'pieSeries',
      payload: { ...value, ...v },
    });
  };

  // const onRadiusChanged = (e: RadiusValue) => {
  //   onFieldChange(e);
  // };

  return (
    <div>
      <Row>
        <p>饼图半径</p>
        <Radius type={type} radius={radius} onChange={onFieldChange} />
      </Row>
      <Row>
        <p>图形样式</p>
        <Col>
          <label>圆角大小</label>
          <InputNumber
            onChange={(e) =>
              onFieldChange({
                itemStyle: { ...(itemStyle || {}), borderRadius: e as number },
              })
            }
            value={itemStyle?.borderRadius}
          />
        </Col>
        <Col>
          <label>描边线宽</label>
          <InputNumber
            min={1}
            onChange={(e) =>
              onFieldChange({
                itemStyle: { ...(itemStyle || {}), borderWidth: e as number },
              })
            }
            value={itemStyle?.borderWidth}
          />
        </Col>
        <Col>
          <label>描边颜色</label>
          <ColorPicker
            presets={[
              {
                label: '纯白',
                colors: ['#fff'],
              },
            ]}
            format='hex'
            value={itemStyle?.borderColor}
            onChange={(e) =>
              onFieldChange({
                itemStyle: {
                  ...(itemStyle || {}),
                  borderColor: e.toHexString(),
                },
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};
