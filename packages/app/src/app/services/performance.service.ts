import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { last, catchError } from 'rxjs/operators';
import { IPerformance, IVenue } from '@steveblack/interfaces';

const config = {
  performanceEndpoint: 'https://www.mariasbasement.com/performance',
  venueEndpoint: 'https://www.mariasbasement.com/venue',
};

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PerformanceService {
  performances: IPerformance[] = [];
  venues = new Map<string, IVenue>();

  static removeArticles(s: string): string {
    const words = s.split(' ');
    const articles = [
      'a',
      'an',
      'the',
    ];

    if (words.length > 1 && articles.includes(words[0].toLowerCase())) {
      return words.splice(1).join(' ');
    }

    return s;
  }

  constructor(
    private http: HttpClient,
  ) { }

  // addSong(artistId: string, song: string) {
  //   return this.http.put(`${config.endpoint}/${artistId}/song`, { song })
  //     .pipe(
  //       catchError(() => {
  //         const message = 'Error adding song for ' + artistId;
  //         return throwError(message);
  //       }),
  //     );
  // }

  // addArtist(artist: string) {
  //   return this.http.post(`${config.endpoint}/`, { artist })
  //     .pipe(
  //       catchError(() => {
  //         const message = 'Error adding artist for ' + artist;
  //         return throwError(message);
  //       }),
  //     );
  // }

  // addArtistWithSong(artist: string, song: string) {
  //   return this.http.post(`${config.endpoint}/`, { artist, song })
  //     .pipe(
  //       catchError(() => {
  //         const message = `Error adding artist and song for artist: ${artist}; song: ${song}`;
  //         return throwError(message);
  //       }),
  //     );
  // }

  getPerformances(): Observable<IPerformance[]> {
    return this.http.get<IPerformance[]>(config.performanceEndpoint)
      .pipe(
        last((performances) => {
          const sortPerformances = performances.sort(
            (a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1,
          );

          this.performances = sortPerformances;

          return true;
        }),
        catchError(() => {
          const message = 'Error loading performances!';
          return throwError(message);
        }),
      );
  }

  getVenues(): Observable<IVenue[]> {
    return this.http.get<IVenue[]>(config.venueEndpoint)
      .pipe(
        last((venues) => {
          this.venues.clear();
          venues
            .sort(
              (a, b) => PerformanceService.removeArticles(a.name).localeCompare(PerformanceService.removeArticles(b.name)),
            )
            .forEach((v) => this.venues.set(v._id, v));

          return true;
        }),
        catchError(() => {
          const message = 'Error loading venues!';
          return throwError(message);
        }),
      );
  }

  // deleteSong(artistId: string, song: string): Observable<any> {
  //   return this.http.delete(`${config.endpoint}/${artistId}/song/${encodeURIComponent(song)}`)
  //     .pipe(
  //       catchError(() => {
  //         const message = `Delete song error! Song:${song} Artist ID: ${artistId} `;
  //         return throwError(message);
  //       }),
  //     );
  // }

  // deleteArtist(artistId: string): Observable<any> {
  //   return this.http.delete(`${config.endpoint}/${artistId}`)
  //     .pipe(
  //       catchError(() => {
  //         const message = `Delete artist error! Artist ID: ${artistId} `;
  //         return throwError(message);
  //       }),
  //     );
  // }
}