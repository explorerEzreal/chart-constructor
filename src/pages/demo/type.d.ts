export type ChartType = 'pie';

export type Item = {
  key: string;
  title: string;
  value: unknown;
  uniqueConfig: unknown;
  component: React.FC;
  onChange: (e: EventMap[ItemKey]) => void;
};
