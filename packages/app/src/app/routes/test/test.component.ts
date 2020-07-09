import { Component, HostBinding } from '@angular/core';
import { faCoffee, faCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import { THEMES } from '@steveblack/interfaces';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @HostBinding('class.container') container = 'container';
  // tslint:disable-next-line:max-line-length
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  // tslint:disable-next-line:max-line-length
  loremLink = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <a href="#">nostrud exercitation</a> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
  theme = 'dark';
  faCoffee = faCoffee;
  faCircle = faCircle;
  faFlag = faFlag;

  constructor(public themeService: ThemeService) { }
}
