import { ICovers } from '@steveblack/interfaces';
import { Component, OnInit } from '@angular/core';
import { CoversService } from 'src/app/services/covers.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  songForm = this.fb.group({
    artist: ['', Validators.required],
    song: ['', Validators.required],
  });
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  isFetching = true;
  covers: ICovers[];

  get songCount() {
    let count = 0;
    this.coversService.covers.forEach((a: ICovers) => {
      count += a.songs.length;
    });
    return count;
  }

  get artists() {
    const artists = [];
    this.coversService.covers.forEach(a => artists.push(a.artist));
    return artists;
  }

  constructor(public coversService: CoversService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCovers();
  }

  getCovers() {
    this.coversService.getCovers()
      .subscribe((covers) => {
        this.covers = covers;
        this.isFetching = false;
      });
  }

  deleteArtist(id: string) {
    this.isFetching = true;
    this.coversService.deleteArtist(id)
      .subscribe(() => {
        this.getCovers();
      });
  }

  deleteSong({id, song}) {
    this.isFetching = true;
    this.coversService.deleteSong(id, song)
      .subscribe(() => {
        this.getCovers();
      });
  }

  onSubmit() {
    const { artist, song } = this.songForm.value;
    let artistId = '';
    this.isFetching = true;
    this.coversService.covers.some((cover) => {
      if (cover.artist === artist) {
        // @ts-ignore
        artistId = cover._id;
        return true;
      }
    });

    if (artistId) {
      this.coversService.addSong(artistId, song)
        .subscribe(() => {
          this.getCovers();
        });
    } else {
      this.coversService.addArtistWithSong(artist, song)
        .subscribe((res: any) => {
          this.getCovers();
        });
    }
  }
}
