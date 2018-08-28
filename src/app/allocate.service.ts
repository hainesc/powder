import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Allocate } from './allocate'

@Injectable({
  providedIn: 'root'
})
export class AllocateService {
  private alUrl = 'api/v1/allocate'

  constructor(private http: HttpClient) { }
  getAllocate(): Observable<Allocate[]> {
    return this.http.get<Allocate[]>(this.alUrl)
      .pipe(
        catchError(this.handleError('getAllocate', []))
      );

  }

  addAllocate(newAllocate): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.alUrl, newAllocate, options)
  }

  deleteAllocate(deleteAllocate: Allocate[]): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    }
    // TODO: recently, the delete method does not support body parameter, but it is in process. So we just use patch here. see: https://github.com/angular/angular/issues/19438
    // Uncomment the line below when the support has done.
    // return this.http.delete('api/v1/allocate', deleteAllocate, options)
    return this.http.patch(this.alUrl, deleteAllocate, options)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

}
