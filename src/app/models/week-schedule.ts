import { DaySchedule } from '../models/day-schedule';

export class WeekSchedule {
  week: string;
  weekIndex: number;
  daySchedules: DaySchedule[];
  state: string;
}
