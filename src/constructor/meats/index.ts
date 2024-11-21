import * as pie from './pie';
import * as line from './line';

const meats = {
  pie,
  line,
};

export type ChartType = keyof typeof meats;
export default meats

