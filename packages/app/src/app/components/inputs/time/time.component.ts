import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  static TimeComponentCounter = 0;
  @Input() label = '[LABEL]';
  @Input() form: FormGroup;
  @Input() required: boolean;
  @Input() name: string;
  @Input() controlName: string;
  @Input() group: FormGroup;
  forId = 'input-date-' + TimeComponent.TimeComponentCounter;
  faAsterisk = faAsterisk;

  constructor() {
    TimeComponent.TimeComponentCounter++;
  }

  ngOnInit(): void {
  }

}
