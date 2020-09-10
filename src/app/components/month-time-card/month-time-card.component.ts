import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { MonthSchedule } from 'src/app/models/month-schedule';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';
import { DaySchedule } from 'src/app/models/day-schedule';

@Component({
  selector: 'app-month-time-card',
  templateUrl: './month-time-card.component.html',
  styleUrls: ['./month-time-card.component.scss'],
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
export class MonthTimeCardComponent implements OnInit {
  monthSchedule: MonthSchedule;

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.monthSchedule = this.timeService.getScheduleForMonth(moment().month());
  }

  toggleWeekSchedules(index: number): void {
    if (this.monthSchedule.weekSchedules[index].daySchedules[0]?.state === 'closed') {
      this.monthSchedule.weekSchedules[index].daySchedules.forEach(daySchedule => {
        daySchedule.state = 'open';
      });
    } else {
      this.monthSchedule.weekSchedules[index].daySchedules.forEach(daySchedule => {
        daySchedule.state = 'closed';
      });
    }
  }

  toggleDaySchedules(weekIndex: number, dayIndex: number): void {
    if (this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules[0]?.state === 'closed') {
      this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules.forEach(schedule => {
        schedule.state = 'open';
      });
    } else {
      this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules.forEach(schedule => {
        schedule.state = 'closed';
      });
    }
  }

  toggleScheduleTasks(weekIndex: number, dayIndex: number, scheduleIndex: number): void {
    if (this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules[scheduleIndex].tasks[0]?.state === 'closed') {
      this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'open';
      });
    } else {
      this.monthSchedule.weekSchedules[weekIndex].daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'closed';
      });
    }
  }
}
