import React, { useEffect } from 'react';
// import { Input, Select, ColorPicker, InputNumber, Switch } from 'antd';
import { ItemProps } from '../../../../Hooks/useInit';
import { Col, ColorPicker, InputNumber, Radio, RadioChangeEvent, Row, Space } from 'antd';
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

type RadiusValue = Pick<Props['value'], 'radius'>;

interface RadiusProps extends RadiusValue {
  onChange: (value: RadiusValue) => void;
}

function Radius(props: RadiusProps) {
  const { radius, onChange } = props;

  const [current, setCurrent] = useSetState<RadiusValue>({ radius });

  const type = radius.length === 1 ? 'common' : 'ring';

  const onTypeChange = (e: RadioChangeEvent) => {
    const v = e.target.value;
    if (v === 'ring') {
      onChange({ radius: [50, 60] });
    } else {
      onChange({ radius: [50] });
    }
  };

  useEffect(() => {
    setCurrent({
      radius,
    });
  }, [radius]);

  return (
    <div>
      <Radio.Group value={type} options={radiusOptions} onChange={onTypeChange} />
      {radius.length === 1 ? (
        <InputNumber
          max={100}
          min={0}
          onChange={(e) => onChange({ ...current, radius: [e] as number[] })}
          formatter={(value) => `${value}%`}
          parser={(value) => value?.replace('%', '') as unknown as number}
          value={current.radius[0] as number}
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
  const { radius, itemStyle } = value;

  const onFieldChange = (v: Partial<Props['value']>) => {
    onChange({
      field: 'pieSeries',
      payload: { ...value, ...v },
    });
  };

  return (
    <div>
      <Row>
        <p>饼图半径</p>
        <Radius radius={radius} onChange={onFieldChange} />
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
            min={0}
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
            format="hex"
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
