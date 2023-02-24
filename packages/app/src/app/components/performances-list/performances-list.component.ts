import { Component, OnInit } from '@angular/core';
import { ITime, PerformanceService } from 'src/app/services/performance.service';

@Component({
  selector: 'app-performances-list',
  templateUrl: './performances-list.component.html',
  styleUrls: ['./performances-list.component.scss']
})
export class PerformancesListComponent implements OnInit {
  isLoading = true;
  static Day = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  static Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  static parseSet(start: ITime, end: ITime): string {
    const startMinIsZero = parseInt(start.minute, 10) === 0;
    const endMinIsZero = parseInt(end.minute, 10) === 0;
    const startMin = startMinIsZero
      ? ''
      : `:${start.minute}`;
    const endMin = endMinIsZero
      ? ''
      : `:${end.minute}`;
    const startMeridian = start.meridian === end.meridian
      ? ''
      : start.meridian;
    return `${start.hour}${startMin}${startMeridian}-${end.hour}${endMin}${end.meridian}`;
  }

  constructor(
    public performanceService: PerformanceService,
  ) { }

  get performances() {
    return this.performanceService.performances
      .map(p => {
        const date = new Date(p.date);
        const [year, month, day] = p.date.split('-');
        const timeStart = this.performanceService.parseTime(p.timeStart);
        const timeEnd = this.performanceService.parseTime(p.timeEnd);
        const venue = this.performanceService.venues.get(p.venue as string);
        const {
          name,
          city,
          state,
          website,
        } = venue;

        return {
          dayString: PerformancesListComponent.Day[date.getDay()],
          monthString: PerformancesListComponent.Month[date.getMonth()],
          month,
          day,
          year,
          timeStart,
          timeEnd,
          name,
          city,
          state,
          website,
          cover: p.coverCharge,
          set: PerformancesListComponent.parseSet(timeStart, timeEnd),
          isCanceled: p.isCanceled,
        }
      });
  }

  async ngOnInit(): Promise<void> {
    await this.performanceService.getPerformances().toPromise();
    await this.performanceService.getVenues().toPromise();
    this.isLoading = false;
  }
}
