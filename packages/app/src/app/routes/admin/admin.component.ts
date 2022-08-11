import { ICovers, IVenue, IPerformance } from '@steveblack/interfaces';
import { Component, OnInit } from '@angular/core';
import { CoversService } from 'src/app/services/covers.service';
import { PerformanceService } from 'src/app/services/performance.service';
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
  performanceForm = this.fb.group({
    venue: ['', Validators.required],
    date: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required],
    cover: ['', Validators.pattern('^[1-9]\\d*$')],
    revenue: ['', Validators.pattern('^[1-9]\\d*$')],
    notes: [''],
  });
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

  get venuesList() {
    const venues = [];
    this.performanceService.venues.forEach(a => venues.push(a.name));
    return venues;
  }

  get performances() {
    return this.performanceService.performances
      .map(performance => ({
        ...performance,
        venueDetails: this.performanceService.venues.get(performance.venue),
      }));
  }

  constructor(
    public coversService: CoversService,
    public performanceService: PerformanceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getCovers();
    this.getVenues();
    // this.getPerformances();
  }

  getCovers() {
    this.coversService.getCovers()
      .subscribe((covers) => {
        this.covers = covers;
        this.isFetching = false;
      });
  }

  getPerformances() {
    this.performanceService.getPerformances()
      .subscribe(() => {
        this.isFetching = false;
      });
  }

  getVenues() {
    this.performanceService.getVenues()
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
