import { Component, OnInit } from '@angular/core';
import { CoversService } from 'src/app/services/covers.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  isFetching = true;

  constructor(public coversService: CoversService) { }

  ngOnInit(): void {
    this.getCovers();
  }

  getCovers() {
    this.coversService.getCovers()
      .subscribe(() => {
        this.isFetching = false;
      });
  }
}
