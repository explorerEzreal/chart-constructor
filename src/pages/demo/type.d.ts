export type ChartType = 'pie';

export type Item = {
  key: string;
  title: string;
  value: unknown;
  uniqueConfig: unknown;
  component: React.FC;
  onChange: (e: EventMap[ItemKey]) => void;
};

export type ComProps = {
  value: unknown;
  onChange: (e: EventMap[ItemKey]) => void;
};
