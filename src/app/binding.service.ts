import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Binding } from './binding'

@Injectable({
  providedIn: 'root'
})
export class BindingService {

  private bdUrl = 'api/v1/binding'
  constructor(private http: HttpClient) { }

  getBinding(): Observable<Binding[]> {
    return this.http.get<Binding[]>(this.bdUrl)
      .pipe(
        catchError(this.handleError('getBinding', []))
      );
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
