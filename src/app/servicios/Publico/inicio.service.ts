import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';



@Injectable({
  providedIn: 'root'
})
export class InicioService {
  URL: string;
  titulo$ = new EventEmitter<string>();

  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
  }


}//fin
