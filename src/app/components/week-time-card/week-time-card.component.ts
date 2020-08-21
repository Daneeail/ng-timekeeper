import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { Schedule } from 'src/app/models/schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-week-time-card',
  templateUrl: './week-time-card.component.html',
  styleUrls: ['./week-time-card.component.scss']
})
export class WeekTimeCardComponent implements OnInit {
  daysOfWeekString: string[] = [];

  constructor(
    public timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.daysOfWeekString = this.timeService.setDaysOfWeekString();
  }
}
