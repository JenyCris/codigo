import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { Tramite } from '../../clases/Publico/Tramite';

@Injectable({
  providedIn: 'root' 
})
export class MisTramitesService {
  URL: string;
  URLREPO: string;
  titulo$ = new EventEmitter<string>();

  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
    this.URLREPO = base.getDireccionRepo();
  }


  //obtener lista de tramites
  getHistorialTramites(Cedula, IdEstado) {
    return this.http.get<HistorialTramites[]>(this.URL + 'api/misTramites/GetHistorialTramites?Cedula=' + Cedula + '&IdEstado=' + IdEstado)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener lista de tramites busqueda general
  getBuscarTramites(Cedula) {
    return this.http.get<HistorialTramites[]>(this.URL + 'api/misTramites/GetHistorialTramitesBuscar?Cedula=' + Cedula)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener lista de tramites por estado
  getTramitesEstado(IdEstado) {
    return this.http.get<HistorialTramites[]>(this.URL + 'api/misTramites/GetHistorialTramitesEstado?IdEstado=' + IdEstado)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener lista de tramites por tipo
  getTramitesFiltro(IdEstado: number, IdSolicitud: number, Nombre: string) {
    return this.http.get<HistorialTramites[]>(this.URL + 'api/Administracion/GetHistorialTramitesFiltro?IdEstado=' + IdEstado + '&IdSolicitud=' + IdSolicitud + '&Nombre=' + Nombre)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }



  //obtener lista de tramites busqueda general
  getTodosTramites() {
    return this.http.get<HistorialTramites[]>(this.URL + 'api/misTramites/GetTodosTramitest')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //actualizar tramite desde el administrador
  UpdateEstadoTramite(obj: Tramite) {
    try {
      return this.http.post<boolean>(this.URL + 'api/misTramites/UpdateEstadoTramite', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }


  //actualizar tramite desde el usuario
  UpdateEstadoTramiteU(obj: Tramite) {
    try {
      return this.http.post<string>(this.URL + 'api/misTramites/UpdateEstadoTramiteU', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }



  //imprimir gastos de un lote
  ImprimirRadicado(IdTramite: number) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    //let Empresa = this.base.getUsuario().NombreEmpresa;
    //let Sede = this.base.getUsuario().NombreSede;
    return this.http.get<string>(this.URLREPO + 'api/Imprimir/GetRadicadoImprime?IdTramite=' + IdTramite)
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
