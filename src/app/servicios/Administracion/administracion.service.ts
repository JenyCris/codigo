import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';
import { Usuario } from '../../clases/Administracion/Usuario';
import { Permisos } from '../../clases/Administracion/Permisos';
import { Modulo } from 'src/app/clases/Administracion/Modulo';
import { Estados } from '../../clases/Administracion/Estados';
import { TipoSuelo } from 'src/app/clases/Administracion/TipoSuelo';
import { CerNomenclatura } from 'src/app/clases/Administracion/CerNomenclatura';
import { HistorialCerNomenclatura } from 'src/app/clases/Administracion/HistorialCerNomenclatura';
import { CerDistancia } from 'src/app/clases/Administracion/CerDistancia';
import { HistorialCerDistancia } from 'src/app/clases/Administracion/HistorialCerDistancia';
import { NormaEOT } from 'src/app/clases/Administracion/NormaEOT';
import { CerSuelo } from 'src/app/clases/Administracion/CerSuelo';
import { Asignado } from 'src/app/clases/Administracion/Asignado';


@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  URL: string;
  URLREPO: string;

  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
    this.URLREPO = base.getDireccionRepo();
    //this.registro = new Registro(0, '', '', '', '', '', 0, 0, 0, '', 0, 0, 0, 0, '', '', '', '', 0, 0, 0, 0, 0, '', '', '', '');
  }

  //login 
  getLogin(obj: Usuario) {

    return this.http.post<Usuario[]>(this.URL + 'api/Administracion/PostLogin', obj)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }


  //obtener lista de permisos de un usuario
  getPermisosUsuarios() {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    let IdUsuario = this.base.getUsuario().IdUsuario;

    return this.http.get<Permisos[]>(this.URL + 'api/Administracion/GetPermisos?IdUsuario=' + IdUsuario)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }

  //obtener lista de modulos
  getListaModulos() {
    return this.http.get<Modulo[]>(this.URL + 'api/Administracion/GetListaModulos')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }


  //obtener lista de estados
  getListaEstados() {
    return this.http.get<Estados[]>(this.URL + 'api/Administracion/GetListaEstados')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }


  //obtener lista de modulos
  getListaTiposSuelos() {
    return this.http.get<TipoSuelo[]>(this.URL + 'api/Administracion/GetTipoSuelos')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }

  //obtener lista de normas EOT
  getListaNormas(IdTipoSuelo: number) {
    return this.http.get<NormaEOT[]>(this.URL + 'api/Certificados/GetListaNormas?IdTipoSuelo=' + IdTipoSuelo)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }

  //insertar certificado nomenclatura
  InsertCerNomenclatura(obj: CerNomenclatura) {
    try {
      return this.http.post<string>(this.URL + 'api/Radicado/PostInsertCerNomenclatura', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }

  //insertar certificado distancia
  InsertCerDistancia(obj: CerDistancia) {
    try {
      return this.http.post<string>(this.URL + 'api/Certificados/PostInsertCerDistancia', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }

  //obtener un certificado de nomenclatura dado
  getCerNomenclatura(IdTramite: number) {
    return this.http.get<HistorialCerNomenclatura[]>(this.URL + 'api/Radicado/GetCerNomenclatura?IdTramite=' + IdTramite)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener un certificado de distancia dado
  getCerDistancia(IdTramite: number) {
    return this.http.get<HistorialCerDistancia[]>(this.URL + 'api/Certificados/GetCerDistancia?IdTramite=' + IdTramite)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //obtener un certificado de uso de suelo dado
  getCerSuelo(IdTramite: number) {
    return this.http.get<CerSuelo[]>(this.URL + 'api/Certificados/GetCerSuelo?IdTramite=' + IdTramite)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //modificar certificado de nomenclatura
  UpdateCerNomenclatura(obj: HistorialCerNomenclatura) {
    return this.http.post<string>(this.URL + 'api/Certificados/UpdateCerNomenclatura', obj)
      .pipe(
        retry(2)
      );
  }

  UpdateCerDistancia(obj: HistorialCerDistancia) {
    return this.http.post<string>(this.URL + 'api/Certificados/UpdateCerDistancia', obj)
      .pipe(
        retry(2)
      );
  }

  UpdateCerSuelo(obj: CerSuelo[]) {
    return this.http.post<string>(this.URL + 'api/Certificados/UpdateCerSuelo', obj)
      .pipe(
        retry(2)
      );
  }

  //insertar certificado uso de suelo
  InsertarUsoSuelo(obj: CerSuelo[]) {
    return this.http.post<string>(this.URL + 'api/Certificados/PostInsertCerUsoSuelo', obj)
      .pipe(
        retry(2)
      );
  }

  //borrar detalle de certificado uso de suelo
  DeleteCerUsoSueloDetalle(obj: Asignado) {
    try {
      return this.http.post<string>(this.URL + 'api/Certificados/PostDeleteCerUsoSueloDetalle', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }
  }


  //imprimir certificado nomenclatura
  ImprimirCerNomenclatura(IdCerNomenclatura: number) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    //let Empresa = this.base.getUsuario().NombreEmpresa;
    //let Sede = this.base.getUsuario().NombreSede;
    return this.http.get<string>(this.URLREPO + 'api/Imprimir/GetCerNomenclaturaImprime?IdCerNomenclatura=' + IdCerNomenclatura)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //imprimir certificado distancia
  ImprimirCerDistancia(IdCerDistancia: number) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    //let Empresa = this.base.getUsuario().NombreEmpresa;
    //let Sede = this.base.getUsuario().NombreSede;
    return this.http.get<string>(this.URLREPO + 'api/Imprimir/GetCerDistanciaImprime?IdCerDistancia=' + IdCerDistancia)
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );
  }

  //imprimir certificado distancia
  ImprimirCerUsoSuelo(IdCerUsoSuelo: number) {
    //let IdEmpresa = this.base.getUsuario().IdEmpresa;
    //let IdSede = this.base.getUsuario().IdSede;
    //let Empresa = this.base.getUsuario().NombreEmpresa;
    //let Sede = this.base.getUsuario().NombreSede;
    return this.http.get<string>(this.URLREPO + 'api/Imprimir/GetCerUsoSueloImprime?IdCerUsoSuelo=' + IdCerUsoSuelo)
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




}//fin
