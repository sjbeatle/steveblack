import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { last, catchError, map } from 'rxjs/operators';
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

  getCovers(): Observable<ICovers[]> {
    return this.http.get<ICovers[]>(config.endpoint)
      .pipe(
        last((covers) => {
          this.covers = covers;
          return true;
        }),
        catchError(() => {
          const message = 'Error loading bits!';
          return throwError(message);
        }),
      );
  }

  // deleteTodos(): Observable<any> {
  //   this.logger.log('Deleting ALL todos ...');
  //   return this.http.delete(config.endpoint)
  //     .pipe(
  //       last(() => {
  //         this.messageService.add('Delete all success!', 'success');
  //         this.covers = [];
  //         return true;
  //       }),
  //       catchError(() => {
  //         const message = 'Delete all error!';
  //         this.messageService.add(message, 'error');
  //         return throwError(message);
  //       }),
  //     );
  // }

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
