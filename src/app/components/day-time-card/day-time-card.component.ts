import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCardComponent } from 'src/app/components/schedule-card/schedule-card.component';
import { Schedule } from 'src/app/models/schedule';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-day-time-card',
  templateUrl: './day-time-card.component.html',
  styleUrls: ['./day-time-card.component.scss']
})
export class DayTimeCardComponent implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  tasks: Task[] = [];
  dialogRef: any;
  dialogRefSub: Subscription;
  faSpinner = faSpinner;
  isTaskStarted = false;
  currentScheduleIndex: number;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dialogRefSub.unsubscribe();
  }

  openScheduleCard(): void {
    this.dialogRef = this.dialog.open(ScheduleCardComponent, {
      autoFocus: false
    });

    this.dialogRefSub = this.dialogRef.afterClosed().subscribe((value: Schedule) => {
      if (value) {
        this.schedules.push(value);
      }
    });
  }

  startTask(scheduleIndex: number, scheduleId: string): void {
    if (this.isTaskStarted) {
      this.stopTask(this.currentScheduleIndex);
    }

    this.isTaskStarted = true;
    this.currentScheduleIndex = scheduleIndex;

    this.schedules[scheduleIndex].tasks.push(new Task(scheduleId));
  }

  stopTask(scheduleIndex: number): void {
    const lastTaskIndex = this.schedules[scheduleIndex].tasks.length;
    this.isTaskStarted = false;

    this.schedules[scheduleIndex].tasks[lastTaskIndex - 1].endDt = new Date();
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
