import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { WeekSchedule } from 'src/app/models/week-schedule';
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
  currentWeekSchedule: WeekSchedule;
  isScheduleDisplayed = false;
  isTaskDisplayed = false;

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.currentWeekSchedule = this.timeService.getScheduleForWeek(moment().week());
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
}
