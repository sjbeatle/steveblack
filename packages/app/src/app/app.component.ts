import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  // tslint:disable-next-line:variable-name
  _covers: any = [];
  get covers() {
    return JSON.stringify(this._covers);
  }

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // this.http.get('http://localhost:4000/covers')
    //   .subscribe(res => {
    //     console.log('>> TESTING >> res', res);
    //     this._covers = res;
    //   });
  }
}
