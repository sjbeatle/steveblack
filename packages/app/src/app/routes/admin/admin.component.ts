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

  constructor(public coversService: CoversService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCovers();
  }

  getCovers() {
    this.coversService.getCovers()
      .subscribe(() => {
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

  deleteSong(id: string, song: string) {
    this.isFetching = true;
    this.coversService.deleteSong(id, song)
      .subscribe(() => {
        this.getCovers();
      });
  }

  onSubmit() {
    const { artist, song } = this.songForm.value;
    let artistId = '';
    this.coversService.covers.some((cover) => {
      if (cover.artist === artist) {
        // @ts-ignore
        artistId = cover._id;
        return true;
      }
    });

    this.isFetching = true;
    if (artistId) {
      this.coversService.addSong(artistId, song)
        .subscribe(() => {
          this.getCovers();
        });
    } else {
      this.coversService.addArtist(artist)
        .subscribe((res: any) => {
          this.coversService.addSong(res._id, song)
          .subscribe(() => {
            this.getCovers();
          });
        });
    }
  }
}
