import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScheduleCardComponent } from 'src/app/components/schedule-card/schedule-card.component';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-day-time-card',
  templateUrl: './day-time-card.component.html',
  styleUrls: ['./day-time-card.component.scss']
})
export class DayTimeCardComponent implements OnInit {
  schedules: Schedule[] = [];
  dialogRef: any;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openScheduleCard(): void {
    this.dialogRef = this.dialog.open(ScheduleCardComponent, {
      autoFocus: false
    });
  }

  getScheduleCardData(): void {
    this.dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }
}
