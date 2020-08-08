import { ITimeUnit } from './time-unit';

export class Task implements ITimeUnit {
  id: string;
  name: string;
  description: string;
  notes: string;
  scheduleId: string;
  startDt: Date;
  endDt: Date;
}
