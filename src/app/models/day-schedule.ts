import { Schedule } from '../models/schedule';

export class DaySchedule {
  day: string;
  dayIndex: number;
  schedules: Schedule[];
  state: string;
}
