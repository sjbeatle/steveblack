import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performances-list',
  templateUrl: './performances-list.component.html',
  styleUrls: ['./performances-list.component.scss']
})
export class PerformancesListComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}
