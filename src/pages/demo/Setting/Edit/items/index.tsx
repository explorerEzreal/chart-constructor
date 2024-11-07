import * as label from './config/label';
import * as tooltip from './config/toolTip';
import * as title from './config/title';
import * as pieSeries from './series/pieSeries';

const items = {
  label,
  tooltip,
  title,
  pieSeries,
};

export type EventMap = {
  label: label.Event;
  tooltip: tooltip.Event;
  title: title.Event;
  pieSeries: pieSeries.Event;
};


export type ItemKey = keyof EventMap;
export type ItemMap = typeof items;
export default items;
