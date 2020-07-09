import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from './services/theme.service';
import getContrastRatio from 'get-contrast-ratio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Steve Black';
  colorOne = '212121';
  colorTwo = 'f8f9f9';
  colorThree = '7e57c2';

  oneOne: number;
  oneTwo: number;
  oneThree: number;
  twoOne: number;
  twoTwo: number;
  twoThree: number;
  threeThree: number;
  threeTwo: number;
  threeOne: number;
  // tslint:disable-next-line:variable-name
  _covers: any = [];
  get covers() {
    return JSON.stringify(this._covers);
  }

  constructor(private http: HttpClient, private themeService: ThemeService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.themeService.fetchTheme();
    // this.http.get('http://localhost:4000/covers')
    //   .subscribe(res => {
    //     console.log('>> TESTING >> res', res);
    //     this._covers = res;
    //   });
    this.calcContrast();
  }

  calcContrast() {
    const c1 = `#${this.colorOne}`;
    const c2 = `#${this.colorTwo}`;
    const c3 = `#${this.colorThree}`;

    this.oneOne = getContrastRatio(c1, c1);
    this.oneTwo = getContrastRatio(c1, c2);
    this.oneThree = getContrastRatio(c1, c3);
    this.twoOne = getContrastRatio(c2, c1);
    this.twoTwo = getContrastRatio(c2, c2);
    this.twoThree = getContrastRatio(c2, c3);
    this.threeOne = getContrastRatio(c3, c1);
    this.threeTwo = getContrastRatio(c3, c2);
    this.threeThree = getContrastRatio(c3, c3);
  }
}
