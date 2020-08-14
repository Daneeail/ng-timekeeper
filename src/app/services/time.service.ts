import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  schedules: Schedule[] = [];
  totalSecondsInDay: number;

  constructor() { }

  calculateSecondsForDay(): void {
    this.schedules.forEach(schedule => {
      schedule.tasks.forEach(task => {
        if (task.endDt && moment(task.startDt).isSame(moment(), 'day')) {
          this.totalSecondsInDay += this.calculateTotalSeconds(task.startDt, task.endDt);
        }
      });
    });
  }

  calculateTotalSeconds(startDt: Date, endDt: Date): number {
    const start = moment(startDt);
    const end = moment(endDt);
    const timeDiff = end.diff(start, 'seconds');

    return timeDiff;
  }
}
