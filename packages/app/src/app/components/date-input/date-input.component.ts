import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { faCalendar, faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {
  @Input() type: string;
  get icon(): IconDefinition {
    return this.type === 'time' ? faClock : faCalendar;
  }
  get title(): string {
    return this.type === 'time' ? 'Clock' : 'Calendar';
  }
  @HostBinding(`class.sb-date-input`) hostClass = true;

  constructor() { }

  ngOnInit(): void {
  }
}
