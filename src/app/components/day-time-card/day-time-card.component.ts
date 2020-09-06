import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ScheduleCardComponent } from 'src/app/components/schedule-card/schedule-card.component';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { Schedule } from 'src/app/models/schedule';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';
import { TimeService } from 'src/app/services/time.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { DaySchedule } from 'src/app/models/day-schedule';

@Component({
  selector: 'app-day-time-card',
  templateUrl: './day-time-card.component.html',
  styleUrls: ['./day-time-card.component.scss']
})
export class DayTimeCardComponent implements OnInit {
  dialogRef: any;
  dialogRefSub: Subscription;
  faSpinner = faSpinner;
  isTaskStarted = false;
  currentDaySchedule: DaySchedule;
  currentScheduleIndex: number;
  currentTaskIndex: number;

  constructor(
    public dialog: MatDialog,
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.currentDaySchedule = this.timeService.getScheduleForDay(moment().dayOfYear());
  }

  openScheduleCard(currentSchedule?: Schedule): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    if (currentSchedule) {
      dialogConfig.data = {
        currentSchedule
      };
    }

    this.dialogRef = this.dialog.open(ScheduleCardComponent, dialogConfig);

    this.dialogRefSub = this.dialogRef.afterClosed().subscribe((value: Schedule) => {
      if (value) {
        this.timeService.schedules.push(value);
        this.currentDaySchedule = this.timeService.getScheduleForDay(moment().dayOfYear());
      } else {
        this.dialogRefSub.unsubscribe();
      }
    });
  }

  openTaskCard(scheduleIndex: number, currentTask?: Task): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      scheduleId: this.timeService.schedules[scheduleIndex].id,
      currentTask
    };

    this.dialogRef = this.dialog.open(TaskCardComponent, dialogConfig);

    this.dialogRefSub = this.dialogRef.afterClosed().subscribe((value: Task) => {
      if (value) {
        this.timeService.schedules[scheduleIndex].tasks.push(value);
        this.setScheduleStartDt(scheduleIndex);
        this.setScheduleEndDt(scheduleIndex);
      } else {
        this.dialogRefSub.unsubscribe();
      }
    });
  }

  startTask(scheduleIndex: number, scheduleId: string): void {
    if (this.isTaskStarted) {
      this.stopTask(this.currentScheduleIndex);
    }

    this.isTaskStarted = true;
    this.currentScheduleIndex = scheduleIndex;

    this.timeService.schedules[scheduleIndex].tasks.push(new Task(scheduleId));

    this.currentTaskIndex = this.timeService.schedules[this.currentScheduleIndex].tasks.length - 1;

    this.setScheduleStartDt(scheduleIndex);
  }

  stopTask(scheduleIndex: number): void {
    this.isTaskStarted = false;

    this.timeService.schedules[scheduleIndex].tasks[this.currentTaskIndex].endDt = new Date();

    this.setScheduleEndDt(scheduleIndex);
  }

  setScheduleStartDt(scheduleIndex: number): void {
    let earliestStartDt: Date;

    if (!this.timeService.schedules[scheduleIndex].startDt) {
      earliestStartDt = new Date();
    } else {
      earliestStartDt = this.timeService.schedules[scheduleIndex].startDt;
    }

    this.timeService.schedules[scheduleIndex].tasks.forEach(task => {
      if (task.startDt < earliestStartDt) { earliestStartDt = task.startDt; }
    });

    this.timeService.schedules[scheduleIndex].startDt = earliestStartDt;
  }

  setScheduleEndDt(scheduleIndex: number): void {
    let lastEndDt: Date;

    if (!this.timeService.schedules[scheduleIndex].endDt) {
      lastEndDt = new Date();
    } else {
      lastEndDt = this.timeService.schedules[scheduleIndex].endDt;
    }

    this.timeService.schedules[scheduleIndex].tasks.forEach(task => {
      if (task.endDt > lastEndDt) { lastEndDt = task.endDt; }
    });

    this.timeService.schedules[scheduleIndex].endDt = lastEndDt;
  }

  removeSchedule(sIndex: number): void {
    this.timeService.schedules.splice(sIndex, 1);
    this.currentDaySchedule = this.timeService.getScheduleForDay(moment().dayOfYear());
  }

  removeTask(sIndex: number, tIndex: number): void {
    this.timeService.schedules[sIndex].tasks.splice(tIndex, 1);
  }
}
