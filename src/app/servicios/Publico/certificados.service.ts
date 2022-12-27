import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';
import { Solicitud } from '../../clases/Publico/Solicitud';
import { Tramite } from '../../clases/Publico/Tramite';


@Injectable({
  providedIn: 'root'
})
export class CertificadosService {
  URL: string;


  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
  }

  //obtener lista solicitudes
  getListaSolicitudes() {
    return this.http.get<Solicitud[]>(this.URL + 'api/Certificado/GetListaSolicitudes')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //insertar tramite
  InsertTramite(obj: Tramite) {
    try {
      return this.http.post<string>(this.URL + 'api/Certificado/PostInsertTramite', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }


  //actualizar tramite desde el administrador
  UpdateTramite(obj: Tramite) {
    try {
      return this.http.post<boolean>(this.URL + 'api/Certificados/UpdateTramite', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }

  //borrar tramite
  DeleteTramite(obj: Tramite) {
    try {
      return this.http.post<string>(this.URL + 'api/Certificados/PostDeleteCertificado', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
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




}
