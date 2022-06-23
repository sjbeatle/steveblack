import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { last, catchError } from 'rxjs/operators';
import { ICovers } from '@steveblack/interfaces';

const config = {
  endpoint: 'https://www.mariasbasement.com/covers',
};

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CoversService {
  covers: ICovers[] = [];

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

  addSong(artistId: string, song: string) {
    return this.http.put(`${config.endpoint}/${artistId}/song`, { song })
      .pipe(
        catchError(() => {
          const message = 'Error adding song for ' + artistId;
          return throwError(message);
        }),
      );
  }

  addArtist(artist: string) {
    return this.http.post(`${config.endpoint}/`, { artist })
      .pipe(
        catchError(() => {
          const message = 'Error adding artist for ' + artist;
          return throwError(message);
        }),
      );
  }

  addArtistWithSong(artist: string, song: string) {
    return this.http.post(`${config.endpoint}/`, { artist, song })
      .pipe(
        catchError(() => {
          const message = `Error adding artist and song for artist: ${artist}; song: ${song}`;
          return throwError(message);
        }),
      );
  }

  getCovers(): Observable<ICovers[]> {
    return this.http.get<ICovers[]>(config.endpoint)
      .pipe(
        last((covers) => {
          const sortCovers = covers.sort(
            (a, b) => CoversService.removeArticles(a.artist).localeCompare(CoversService.removeArticles(b.artist)),
          );

          sortCovers.forEach(a => {
            if (a.songs && a.songs.length) {
              a.songs = a.songs.sort((c, d) => CoversService.removeArticles(c).localeCompare(CoversService.removeArticles(d)));
            }
          });

          this.covers = sortCovers;

          return true;
        }),
        catchError(() => {
          const message = 'Error loading bits!';
          return throwError(message);
        }),
      );
  }

  deleteSong(artistId: string, song: string): Observable<any> {
    return this.http.delete(`${config.endpoint}/${artistId}/song/${encodeURIComponent(song)}`)
      .pipe(
        catchError(() => {
          const message = `Delete song error! Song:${song} Artist ID: ${artistId} `;
          return throwError(message);
        }),
      );
  }

  deleteArtist(artistId: string): Observable<any> {
    return this.http.delete(`${config.endpoint}/${artistId}`)
      .pipe(
        catchError(() => {
          const message = `Delete artist error! Artist ID: ${artistId} `;
          return throwError(message);
        }),
      );
  }
}
