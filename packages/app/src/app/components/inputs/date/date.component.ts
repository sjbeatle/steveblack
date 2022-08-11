import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  static DateComponentCounter = 0;
  @Input() label = '[LABEL]';
  @Input() form: FormGroup;
  @Input() required: boolean;
  @Input() name: string;
  @Input() controlName: string;
  @Input() group: FormGroup;
  forId = 'input-date-' + DateComponent.DateComponentCounter;
  faAsterisk = faAsterisk;

  constructor() {
    DateComponent.DateComponentCounter++;
  }

  ngOnInit(): void {
  }

}
