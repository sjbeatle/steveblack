import { Component, OnInit } from '@angular/core';
import { faCoffee, faCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import { ICovers } from '@steveblack/interfaces';
import { CoversService } from '../../services/covers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  // tslint:disable-next-line:max-line-length
  loremLink = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <a href="#">nostrud exercitation</a> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
  faCoffee = faCoffee;
  faCircle = faCircle;
  faFlag = faFlag;
  covers: ICovers[] = [];
  isFetching = true;

  constructor(
    public coversService: CoversService
  ) { }

  ngOnInit() {
    this.getCovers();
  }

  getCovers() {
    this.coversService.getCovers()
      .subscribe((covers) => {
        setTimeout(() => {
          this.covers = covers;
          this.isFetching = false;
        }, 1000);
      });
  }
}
