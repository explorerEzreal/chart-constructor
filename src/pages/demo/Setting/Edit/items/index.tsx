import * as label from './config/label';
import * as toolTip from './config/toolTip';
import * as title from './config/title';

const items = {
  label,
  toolTip,
  title,
};

export type EventMap = {
  label: label.Event;
  toolTip: toolTip.Event;
  title: title.Event;
};

export type ItemKey = keyof EventMap;
export type ItemMap = typeof items;
export default items;
