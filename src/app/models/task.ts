import { ITimeUnit } from './time-unit';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

export class Task implements ITimeUnit {
  id: string;
  name: string;
  description: string;
  notes: string;
  scheduleId: string;
  startDt: Date;
  endDt: Date;
  state: string;
  dayIndex: number;

  constructor(scheduleId: string) {
    this.id = uuidv4();
    this.name = 'Task';
    this.description = '';
    this.notes = '';
    this.scheduleId = scheduleId;
    this.startDt = new Date();
    this.endDt = null;
    this.state = 'closed';
    this.dayIndex = moment().dayOfYear();
  }
}
