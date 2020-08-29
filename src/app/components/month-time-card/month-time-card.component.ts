import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { MonthSchedule } from 'src/app/models/month-schedule';

@Component({
  selector: 'app-month-time-card',
  templateUrl: './month-time-card.component.html',
  styleUrls: ['./month-time-card.component.scss']
})
export class MonthTimeCardComponent implements OnInit {
  weeksOfMonth: string[] = [];
  currentMonthSchedule: MonthSchedule = {} as MonthSchedule;

  constructor(
    private timeService: TimeService
  ) { }

  ngOnInit(): void {
  }

}
