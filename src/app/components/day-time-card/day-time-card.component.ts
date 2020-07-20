import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-day-time-card',
  templateUrl: './day-time-card.component.html',
  styleUrls: ['./day-time-card.component.scss']
})
export class DayTimeCardComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openTaskCard(): void {
    this.dialog.open();
  }

}
