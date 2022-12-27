import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BaseService } from '../../servicios/base.service';
import { ListaUsuarios } from '../../clases/Administracion/ListaUsuarios';
import { Usuario } from 'src/app/clases/Administracion/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL: string;

  constructor(private http: HttpClient, public base: BaseService) {
    this.URL = base.getDireccion();
  }

  //obtener lista usuarios para una sede
  getListaUsuarios() {
    

    return this.http.get<ListaUsuarios[]>(this.URL + 'api/Administracion/GetListaUsuarios')
      .pipe(
        tap(bodegas => this.log(`fetched Tipo Vehiculo`)),
        catchError(this.handleError('getTipoVehiculoByEmpresa', []))
      );

  }

  //insertar usuario
  InsertUsuario(obj: Usuario) {
    
    try {
      return this.http.post<string>(this.URL + 'api/Administracion/PostInsertarUsuario', obj)
        .pipe(
          retry(2)
        );
    } catch (e) {
      return e;
    }

  }


  //modificar proveedor
  UpdateUsuario(obj: Usuario) {
    
    return this.http.post<boolean>(this.URL + 'api/Administracion/UpdateUsuario', obj)
      .pipe(
        retry(2)
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
