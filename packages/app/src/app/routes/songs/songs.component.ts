import { Component, OnInit } from '@angular/core';
import { ICovers } from '@steveblack/interfaces';
import { CoversService } from '../../services/covers.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  covers: ICovers[] = [];
  isFetching = true;
  letters = [];

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

          const artists = new Set(this.covers.map(c => {
            return CoversService.removeArticles(c.artist)[0];
          }));
          this.letters = Array.from(artists);
        }, 1000);
      });
  }
}
