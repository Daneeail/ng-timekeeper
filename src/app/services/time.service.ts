import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { DaySchedule } from 'src/app/models/day-schedule';
import { WeekSchedule } from '../models/week-schedule';
import { MonthSchedule } from '../models/month-schedule';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  schedules: Schedule[] = [];

  constructor() { }

  calculateTaskSeconds(startDt: Date, endDt?: Date): number {
    const start = moment(startDt);
    const end = endDt ? moment(endDt) : moment();
    const timeDiff = end.diff(start, 'seconds');

    return timeDiff + 1;
  }

  calculateScheduleSeconds(schedule: Schedule): number {
    let totalSeconds = 0;

    schedule.tasks.forEach(task => {
      if (task.endDt) {
        totalSeconds += this.calculateTaskSeconds(task.startDt, task.endDt);
      }
    });

    return totalSeconds;
  }

  convertSecondsToLongTimeString(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const secString = secs === 1 ? ' second' : ' seconds';
    const minString = mins === 1 ? ' minute and ' : ' minutes and ';
    const hrString = hrs === 1 ? ' hour ' : ' hours ';

    if (seconds < 60) {
      return seconds + secString;
    } else if (seconds < 3600) {
      return mins + minString + secs + secString;
    } else {
      return hrs + hrString + mins + minString + secs + secString;
    }
  }

  convertSecondsToShortTimeString(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const secString = secs === 1 ? ' sec' : ' secs';
    const minString = mins === 1 ? ' min : ' : '  mins : ';
    const hrString = hrs === 1 ? ' hr : ' : ' hrs : ';

    return hrs + hrString + mins + minString + secs + secString;
  }

  getScheduleForDay(dayIndex: number): DaySchedule {
    const daySchedule = new DaySchedule();

    daySchedule.day = moment().dayOfYear(dayIndex).format('dddd - MMMM Do, YYYY');
    daySchedule.dayIndex = dayIndex;
    daySchedule.schedules = this.schedules.filter(schedule => schedule.dayIndex === dayIndex);

    return daySchedule;
  }

  getScheduleForWeek(weekIndex: number): WeekSchedule {
    const weekSchedule = new WeekSchedule();

    let startOfWeekDayIndex = moment().week(weekIndex).startOf('week').dayOfYear();
    let endOfWeekDayIndex = moment().week(weekIndex).endOf('week').dayOfYear();

    if (weekIndex === 1) {
      startOfWeekDayIndex = 1;
    }
    if (weekIndex > 1) {
      endOfWeekDayIndex = moment().week(weekIndex).endOf('week').dayOfYear() >
      moment().week(weekIndex).startOf('week').dayOfYear() ?
      moment().week(weekIndex).endOf('week').dayOfYear() : moment().endOf('year').dayOfYear();
    }

    weekSchedule.week = moment().dayOfYear(startOfWeekDayIndex).format('MMMM Do') + ' to ' + moment().dayOfYear(endOfWeekDayIndex).format('MMMM Do');
    weekSchedule.weekIndex = weekIndex;
    weekSchedule.daySchedules = [];
    for (let i = startOfWeekDayIndex; i < endOfWeekDayIndex + 1; i++) {
      let daySchedule = new DaySchedule();
      daySchedule = this.getScheduleForDay(i);
      weekSchedule.daySchedules.push(daySchedule);
    }

    return weekSchedule;
  }

  getScheduleForMonth(monthIndex: number): MonthSchedule {
    const monthSchedule = new MonthSchedule();

    const startOfMonthWeekIndex = moment().month(monthIndex).startOf('month').isoWeek();
    const endOfMonthWeekIndex = moment().month(monthIndex).endOf('month').isoWeek();

    monthSchedule.month = moment().month(monthIndex).format('MMMM');
    monthSchedule.monthIndex = monthIndex;
    monthSchedule.weekSchedules = [];
    for (let i = startOfMonthWeekIndex; i < endOfMonthWeekIndex + 1; i++) {
      let weekSchedule = new WeekSchedule();
      weekSchedule = this.getScheduleForWeek(i);
      monthSchedule.weekSchedules.push(weekSchedule);
    }

    return monthSchedule;
  }

  calculateTaskElapsedTime(startDt: Date): string {
    const timeDiff = this.calculateTaskSeconds(startDt);

    return this.convertSecondsToLongTimeString(timeDiff);
  }

  calculateTaskDuration(startDt: Date, endDt: Date): string {
    const timeDiff = this.calculateTaskSeconds(startDt, endDt);

    return this.convertSecondsToShortTimeString(timeDiff);
  }

  calculateScheduleDuration(schedule: Schedule): string {
    const timeDiff = this.calculateScheduleSeconds(schedule);

    return this.convertSecondsToShortTimeString(timeDiff);
  }
}
