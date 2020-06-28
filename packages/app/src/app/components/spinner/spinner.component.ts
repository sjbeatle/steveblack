import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  @HostBinding('class.sb-spinner') sbSpinner = 'sb-spinner';
  faSpinner = faSpinner;

  constructor() { }
}
