import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { DaySchedule } from 'src/app/models/day-schedule';
import * as moment from 'moment';
import { WeekSchedule } from '../models/week-schedule';
import { MonthSchedule } from '../models/month-schedule';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  schedules: Schedule[] = [];

  constructor() { }

  calculateTotalSeconds(startDt: Date, endDt?: Date): number {
    const start = moment(startDt);
    const end = endDt ? moment(endDt) : moment();
    const timeDiff = end.diff(start, 'seconds') + 1;

    return timeDiff;
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

  setDaysOfWeek(): string[] {
    const daysOfWeek: string[] = [];

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(moment().startOf('week').add(i, 'days').format('dddd - MMMM Do, YYYY'));
    }

    return daysOfWeek;
  }

  setWeeksOfCurrentMonth(): string[] {
    const weeksOfMonth: string[] = [];

    const currentMonth = moment().get('month');
    let checkMonth = moment().get('month');
    let currentWeek = moment().startOf('month').isoWeek();

    while (currentMonth === checkMonth) {
      const week = moment().week(currentWeek).startOf('week').format('MMMM Do') + ' to ' + moment().week(currentWeek).endOf('week').format('MMMM Do');
      weeksOfMonth.push(week);

      currentWeek++;
      checkMonth = moment().isoWeek(currentWeek).get('month');
    }

    const lastWeek = moment().isoWeek(currentWeek).startOf('week').format('MMMM Do') + ' to ' +
      moment().isoWeek(currentWeek).endOf('week').format('MMMM Do');
    weeksOfMonth.push(lastWeek);

    return weeksOfMonth;
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
}
