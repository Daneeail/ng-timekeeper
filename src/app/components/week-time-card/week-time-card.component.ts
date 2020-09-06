import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { WeekSchedule } from 'src/app/models/week-schedule';
import { DaySchedule } from 'src/app/models/day-schedule';
import { Schedule } from 'src/app/models/schedule';
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
          animate('0.25s ease-in-out')
      ]),
      transition('closed => open', [
          animate('0.25s ease-in-out')
      ]),
    ]),
  ]
})
export class WeekTimeCardComponent implements OnInit {
  daysOfWeek: string[] = [];
  currentWeekSchedule: WeekSchedule = {} as WeekSchedule;
  isScheduleDisplayed = false;
  isTaskDisplayed = false;

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.daysOfWeek = this.timeService.setDaysOfWeek();
    this.currentWeekSchedule = this.setWeekSchedule();
    this.setConsistentOpenState();
  }

  toggleDaySchedules(index: number): void {
    if (this.currentWeekSchedule.daySchedules[index].schedules[0]?.state === 'closed') {
      this.currentWeekSchedule.daySchedules[index].schedules.forEach(schedule => {
        schedule.state = 'open';
      });
    } else {
      this.currentWeekSchedule.daySchedules[index].schedules.forEach(schedule => {
        schedule.state = 'closed';
      });
    }
  }

  toggleScheduleTasks(dayIndex: number, scheduleIndex: number): void {
    if (this.currentWeekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks[0]?.state === 'closed') {
      this.currentWeekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'open';
      });
    } else {
      this.currentWeekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'closed';
      });
    }
  }

  setConsistentOpenState(): void {
    this.currentWeekSchedule.daySchedules.forEach(daySchedule => {
      if (daySchedule.schedules[0]?.state === 'open') {
        daySchedule.schedules.forEach(schedule => {
          schedule.state = 'open';
        });
      }

      daySchedule.schedules.forEach(schedule => {
        if (schedule.tasks[0]?.state === 'open') {
          schedule.tasks.forEach(task => {
            task.state = 'open';
          });
        }
      });
    });
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

  calculateTaskDuration(startDt: Date, endDt: Date): string {
    const timeDiff = this.timeService.calculateTaskSeconds(startDt, endDt);

    return this.timeService.convertSecondsToShortTimeString(timeDiff);
  }

  calculateTotalScheduleTime(schedule: Schedule): number {
    let totalSeconds = 0;
    schedule.tasks.forEach(task => {
      totalSeconds += this.timeService.calculateTaskSeconds(task.startDt, task.endDt);
    });

    return totalSeconds;
  }

  getTotalScheduleTimeString(schedule: Schedule): string {
    const seconds = this.calculateTotalScheduleTime(schedule);
    return this.timeService.convertSecondsToShortTimeString(seconds);
  }
}
