import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';
import { Radicado } from '../../clases/Radicado/Radicado';
import { ListaRadicado } from '../../clases/Radicado/ListaRadicado';

@Injectable({
  providedIn: 'root'
})
export class RadicadoService {

  URL: string;

  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
  }

  //insertar bodega
  InsertRadicado(obj: Radicado) {
    //obj.IdEmpresa = this.base.getUsuario().IdEmpresa;
    //obj.IdSede = this.base.getUsuario().IdSede;
    try {
      return this.http.post<boolean>(this.URL + 'api/Radicado/PostInsertRadicado', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }

  }


  //obtener lista de radicados
  getListaRadicados(FechaInicial: string, FechaFinal: string, Cedula: string) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    return this.http.get<ListaRadicado[]>(this.URL + 'api/Radicado/GetListaHistorialRadicados?FechaInicial=' + FechaInicial + '&FechaFinal=' + FechaFinal + '&Cedula=' + Cedula )
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener lista de radicados por fecha
  getHistorialRadicados(FechaInicial: string, FechaFinal: string) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    return this.http.get<ListaRadicado[]>(this.URL + 'api/Radicado/GetHistorialRadicados?FechaInicial=' + FechaInicial + '&FechaFinal=' + FechaFinal)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
  }




}
