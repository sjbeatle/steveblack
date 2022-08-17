import { ICovers } from '@steveblack/interfaces';
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
  showVenueForm = false;
  songForm = this.fb.group({
    artist: ['', Validators.required],
    song: ['', Validators.required],
  });
  performanceForm = this.fb.group({
    venue: [''],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    timeStart: ['12:00', Validators.required],
    timeEnd: ['15:00', Validators.required],
    coverCharge: ['', Validators.pattern('^[1-9]\\d*$')],
    revenue: [
      '200',
      [
        Validators.pattern('^[1-9]\\d*$'),
        Validators.required,
      ],
    ],
    notes: [''],
    name: [''],
    phone: [''],
    email: ['', Validators.email],
    website: [''],
    addressLineOne: [''],
    addressLineTwo: [''],
    city: [''],
    state: ['NY'],
    zip: [''],
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
        venueDetails: this.performanceService.venues.get(performance.venue as string),
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
    this.getPerformances();
    this.performanceForm.get('timeStart').valueChanges.subscribe(
      (val) => {
        if (!val) {
          return;
          this.performanceForm.get('timeEnd').setValue('12:00');
        }
        const [hour, min] = val.split(':');
        const newHour = `${(parseInt(hour, 10) + 3) % 24}`;
        const newHourString = newHour.length === 1
          ? `0${newHour}`
          : newHour;
        this.performanceForm.get('timeEnd').setValue(`${newHourString}:${min}`);
      }
    );
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
        console.log('>> TESTING >> this.performanceService.performances', this.performanceService.performances);
        this.isFetching = false;
      });
  }

  getVenues() {
    this.performanceService.getVenues()
      .subscribe(() => {
        console.log('>> TESTING >> this.performanceService.venues', this.performanceService.venues);
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

  toggleVenueForm() {
    this.showVenueForm = !this.showVenueForm;
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

  submitPerformance() {
    const payload = {
      ...this.performanceForm.value,
    };

    if (!payload.venue) {
      payload.venue = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        website: payload.website,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        city: payload.city,
        state: payload.state,
        zip: payload.zip,
      };
    } else {
      this.performanceService.venues.forEach((venue) => {
        if (venue.name === payload.venue) {
          // @ts-ignore
          payload.venue = venue._id;
        }
      });
    }
    this.performanceService.addPerformance(payload)
      .subscribe(() => {
        if (typeof payload.venue === 'object') {
          this.getVenues();
          this.toggleVenueForm();
        }
        this.getPerformances();
        this.performanceForm.reset({
          date: payload.date,
          timeStart: '12:00',
          timeEnd: '15:00',
          state: 'NY',
          revenue: '200',
        });
      });
  }
}
