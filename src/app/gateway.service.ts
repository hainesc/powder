import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Gateway } from './gateway'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  // TODO:
  private gwUrl = 'api/v1/gateway'

  constructor(private http: HttpClient) { }

  getGateway(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(this.gwUrl)
      .pipe(
        catchError(this.handleError('getGateway', []))
      );

  }

  addGateway(newGateway): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.gwUrl, newGateway, options)
  }

  deleteGateway(deleteGateway: Gateway[]): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    }
    // TODO: recently, the delete method does not support body parameter, but it is in process. So we just use patch here. see: https://github.com/angular/angular/issues/19438
    // Uncomment the line below when the support has done.
    // return this.http.delete('api/v1/gateway', deleteGateway, options)
    return this.http.patch(this.gwUrl, deleteGateway, options)
  }

  addIpAddress(tenant: string, newIp: string[]): Promise<any> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(`api/v1/${tenant}/ip`, newIp, options)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
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

  /*
  private handleError(error: any): Promise<any> {
    console.error('An error happened in service', error);
    return Promise.reject(error.body || error);
  }
  */
}
