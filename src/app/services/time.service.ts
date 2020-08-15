import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  schedules: Schedule[] = [];

  constructor() { }

  calculateTotalSeconds(startDt: Date, endDt?: Date): number {
    const start = moment(startDt);
    const end = endDt ? moment(endDt) : moment();
    const timeDiff = end.diff(start, 'seconds');

    return timeDiff;
  }

  convertSecondsToLongTimeString(seconds: number): string {
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

  convertSecondsToShortTimeString(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const secString = secs === 1 ? ' sec' : ' secs';
    const minString = mins === 1 ? ' min : ' : '  mins : ';
    const hrString = hrs === 1 ? ' hr : ' : ' hrs : ';

    return hrs + hrString + mins + minString + secs + secString;
  }
}
