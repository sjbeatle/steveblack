import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { last, catchError } from 'rxjs/operators';
import { ICovers } from '@steveblack/interfaces';

const config = {
  endpoint: 'http://localhost:5000/covers',
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

  // addCovers(covers: ICovers): Observable<ICovers> {
  //   this.logger.log('Adding covers ...');
  //   return this.http.post<ICovers>(config.endpoint, covers)
  //     .pipe(
  //       last((payload) => {
  //         const bit = payload.covers;
  //         this.covers.push({
  //           covers: decodeURI(payload.covers),
  //           createdDate: payload.createdDate,
  //           updatedDate: payload.updatedDate,
  //           priority: payload.priority,
  //           _id: payload._id,
  //         });
  //         return true;
  //       }),
  //       catchError(() => {
  //         const message = 'Add bit error!';
  //         this.messageService.add(message, 'error');
  //         return throwError(message);
  //       }),
  //     );
  // }
  addSong(artistId: string, song: string) {
    return this.http.put(`http://localhost:5000/covers/${artistId}/song`, { song })
      .pipe(
        catchError(() => {
          const message = 'Error adding song for ' + artistId;
          return throwError(message);
        }),
      );
  }

  addArtist(artist: string) {
    return this.http.post(`http://localhost:5000/covers/`, { artist })
      .pipe(
        catchError(() => {
          const message = 'Error adding artist for ' + artist;
          return throwError(message);
        }),
      );
  }

  addArtistWithSong(artist: string, song: string) {
    return this.http.post(`http://localhost:5000/covers/`, { artist, song })
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
    return this.http.delete(`http://localhost:5000/covers/${artistId}/song/${encodeURIComponent(song)}`)
      .pipe(
        catchError(() => {
          const message = `Delete song error! Song:${song} Artist ID: ${artistId} `;
          return throwError(message);
        }),
      );
  }

  deleteArtist(artistId: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/covers/${artistId}`)
      .pipe(
        catchError(() => {
          const message = `Delete artist error! Artist ID: ${artistId} `;
          return throwError(message);
        }),
      );
  }

  // deleteTodo(id: string): Observable<any> {
  //   this.logger.log(`Deleting todo: ${id} ...`);
  //   return this.http.delete(`${config.endpoint}/${id}`)
  //     .pipe(
  //       last(() => {
  //         this.covers = this.covers.filter(todo => todo._id !== id);
  //         return true;
  //       }),
  //       catchError(() => {
  //         const message = 'Delete bit error!';
  //         this.messageService.add(message, 'error');
  //         return throwError(message);
  //       }),
  //     );
  // }

  // updateTodo(todo: ICovers): Observable<any> {
  //   this.logger.log('Updating todos ...');
  //   return this.http.put(`${config.endpoint}/${todo._id}`, todo)
  //     .pipe(
  //       last(() => {
  //         const newTodos = this.covers.map(item => {
  //           if (item._id === todo._id) {
  //             item = todo;
  //           }

  //           return item;
  //         });
  //         this.covers = newTodos;
  //         return true;
  //       }),
  //       catchError(() => {
  //         const message = 'Update error!';
  //         this.messageService.add(message, 'error');
  //         return throwError(message);
  //       }),
  //     );
  // }

  // updatePriority(id: string, priority: boolean) {
  //   let todo: ICovers;

  //   this.covers.some(item => {
  //     if (item._id === id) {
  //       todo = item;
  //       todo.priority = priority;
  //       return true;
  //     }
  //   });

  //   return this.updateTodo(todo);
  // }

  // updateTodoTimer(index: number) {
  //   const now = new Date();
  //   const timer = new Date(now.getTime() + 30 * 60000);
  //   const todo = this.covers[index];
  //   todo.timer = timer.toISOString();

  //   return this.updateTodo(todo);
  // }
}
