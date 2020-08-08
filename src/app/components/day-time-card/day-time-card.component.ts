import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCardComponent } from 'src/app/components/schedule-card/schedule-card.component';
import { Schedule } from 'src/app/models/schedule';
import { Subscription } from 'rxjs';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-day-time-card',
  templateUrl: './day-time-card.component.html',
  styleUrls: ['./day-time-card.component.scss']
})
export class DayTimeCardComponent implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  dialogRef: any;
  dialogRefSub: Subscription;
  faSpinner = faSpinner;

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
}
