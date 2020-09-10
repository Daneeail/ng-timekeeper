import { Component, OnInit, Input } from '@angular/core';
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
  weekSchedule: WeekSchedule;
  isScheduleDisplayed = false;
  isTaskDisplayed = false;

  @Input() public weekIndex: number = null;

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.weekSchedule = !this.weekIndex ? this.timeService.getScheduleForWeek(moment().week()) :
      this.timeService.getScheduleForWeek(this.weekIndex);
    this.setConsistentOpenState();
  }

  toggleDaySchedules(index: number): void {
    if (this.weekSchedule.daySchedules[index].schedules[0]?.state === 'closed') {
      this.weekSchedule.daySchedules[index].schedules.forEach(schedule => {
        schedule.state = 'open';
      });
    } else {
      this.weekSchedule.daySchedules[index].schedules.forEach(schedule => {
        schedule.state = 'closed';
      });
    }
  }

  toggleScheduleTasks(dayIndex: number, scheduleIndex: number): void {
    if (this.weekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks[0]?.state === 'closed') {
      this.weekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'open';
      });
    } else {
      this.weekSchedule.daySchedules[dayIndex].schedules[scheduleIndex].tasks.forEach(task => {
        task.state = 'closed';
      });
    }
  }

  setConsistentOpenState(): void {
    this.weekSchedule.daySchedules.forEach(daySchedule => {
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
