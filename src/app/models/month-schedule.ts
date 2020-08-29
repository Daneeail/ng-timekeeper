import { WeekSchedule } from '../models/week-schedule';

export class MonthSchedule {
  month: string;
  monthIndex: number;
  weekSchedules: WeekSchedule[];
}
