import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';

@Component({
  selector: 'app-elapsed-time-display',
  templateUrl: './elapsed-time-display.component.html',
  styleUrls: ['./elapsed-time-display.component.scss']
})
export class ElapsedTimeDisplayComponent implements OnInit {

  constructor(
    private timeService: TimeService
  ) { }

  ngOnInit(): void {
  }

  calculateCurrentUnitOfTime(unitOfTime: any): string {
    return unitOfTime === 'day' ? moment().format('dddd - MMMM Do, YYYY') :
      moment().startOf(unitOfTime).format('MMMM Do') + ' to ' + moment().endOf(unitOfTime).format('MMMM Do');
  }

  calculateTotalSecondsInTimeCard(unitOfTime: any): number {
    let totalSecondsInDay = 0;
    this.timeService.schedules.forEach(schedule => {
      schedule.tasks.forEach(task => {
        if (moment(task.startDt).isSame(moment(), unitOfTime)) {
          if (task.endDt) {
            totalSecondsInDay += this.timeService.calculateTotalSeconds(task.startDt, task.endDt);
          }
        }
      });
    });

    return totalSecondsInDay;
  }

  calculateTotalTimeString(unitOfTime: any): string {
    const totalSecondsInDay = this.calculateTotalSecondsInTimeCard(unitOfTime);

    return this.timeService.convertSecondsToShortTimeString(totalSecondsInDay);
  }

}
