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
  currentScheduleIndex: number;
  currentTaskIndex: number;

  constructor(
    public dialog: MatDialog,
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
  }

  openScheduleCard(): void {
    this.dialogRef = this.dialog.open(ScheduleCardComponent, {
      autoFocus: false
    });

    this.dialogRefSub = this.dialogRef.afterClosed().subscribe((value: Schedule) => {
      if (value) {
        this.timeService.schedules.push(value);
      } else {
        this.dialogRefSub.unsubscribe();
      }
    });
  }

  openTaskCard(scheduleIndex: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      scheduleId: this.timeService.schedules[scheduleIndex].id
    };

    this.dialogRef = this.dialog.open(TaskCardComponent, dialogConfig);

    this.dialogRefSub = this.dialogRef.afterClosed().subscribe((value: Task) => {
      if (value) {
        this.timeService.schedules[scheduleIndex].tasks.push(value);
      } else {
        this.dialogRefSub.unsubscribe();
      }
    });
  }

  startTask(scheduleIndex: number, scheduleId: string): void {
    if (this.isTaskStarted) {
      this.stopTask(this.currentScheduleIndex);
    }

    this.timeService.schedules[scheduleIndex].tasks.push(new Task(scheduleId));

    this.isTaskStarted = true;
    this.currentScheduleIndex = scheduleIndex;
    this.currentTaskIndex = this.timeService.schedules[this.currentScheduleIndex].tasks.length - 1;
  }

  stopTask(scheduleIndex: number): void {
    this.isTaskStarted = false;

    this.timeService.schedules[scheduleIndex].tasks[this.currentTaskIndex].endDt = new Date();
  }

  calculateTaskDuration(startDt: Date): string {
    const start = moment(startDt);
    const end = moment();
    const timeDiff = end.diff(start, 'seconds');

    return this.convertSecondsToDuration(timeDiff);
  }

  convertSecondsToDuration(seconds: number): string {
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
}
