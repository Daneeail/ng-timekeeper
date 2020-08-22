import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { WeekSchedule } from 'src/app/models/week-schedule';
import { DaySchedule } from 'src/app/models/day-schedule';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';


@Component({
  selector: 'app-week-time-card',
  templateUrl: './week-time-card.component.html',
  styleUrls: ['./week-time-card.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
          height: '*',
          opacity: 1,
      })),
      state('closed', style({
          height: '0',
          opacity: 0
      })),
      transition('open => closed', [
          animate('0.35s')
      ]),
      transition('closed => open', [
          animate('0.35s')
      ]),
    ]),
  ]
})
export class WeekTimeCardComponent implements OnInit {
  daysOfWeekString: string[] = [];
  currentWeekSchedule: WeekSchedule = {} as WeekSchedule;
  isScheduleDisplayed = false;
  isTaskDisplayed = false;

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.daysOfWeekString = this.timeService.setDaysOfWeekString();
    this.currentWeekSchedule = this.setWeekSchedule();
  }

  toggleSchedule(): void {
    this.isScheduleDisplayed = !this.isScheduleDisplayed;
  }

  toggleTask(): void {
    this.isTaskDisplayed = !this.isTaskDisplayed;
  }

  setWeekSchedule(): WeekSchedule {
    const weekSchedule: WeekSchedule = {} as WeekSchedule;

    this.setDayIndex(weekSchedule);
    this.addSchedulesForCurrentWeek(weekSchedule);

    return weekSchedule;
  }

  addSchedulesForCurrentWeek(weekSchedule: WeekSchedule): WeekSchedule {
    this.timeService.schedules.forEach(schedule => {
      for (let i = 0; i < 7; i++) {
        if (moment().startOf('week').add(i, 'days').isSame(schedule.startDt, 'day')) {
          weekSchedule.daySchedules[i].schedules.push(schedule);
          continue;
        }
      }
    });

    return weekSchedule;
  }

  setDayIndex(weekSchedule: WeekSchedule): WeekSchedule {
    weekSchedule.daySchedules = [];

    for (let i = 0; i < 7; i++) {
      weekSchedule.daySchedules.push(new DaySchedule());
      weekSchedule.daySchedules[i].dayIndex = i;
      weekSchedule.daySchedules[i].schedules = [];
    }

    return weekSchedule;
  }
}
