import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-elapsed-time-display',
  templateUrl: './elapsed-time-display.component.html',
  styleUrls: ['./elapsed-time-display.component.scss']
})
export class ElapsedTimeDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentDay(): string {
    return moment().format('dddd - MMMM Do, YYYY');
  }

  getCurrentWeek(): string {
    return moment().startOf('week').format('MMMM Do') + ' to ' + moment().endOf('week').format('MMMM Do');
  }

  getCurrentMonth(): string {
    return moment().startOf('month').format('MMMM Do') + ' to ' + moment().endOf('month').format('MMMM Do');
  }

}
