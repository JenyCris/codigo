import { Injectable } from '@angular/core';
import { Usuario } from '../clases/Administracion/Usuario';
import { Permisos } from '../clases/Administracion/Permisos';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  //private Url = 'http://localhost:50180/';
  private Url = 'http://api.dechinacota.co/';

  //private UrlRepo = 'http://localhost:56339/';
  private UrlRepo = 'http://apirep.dechinacota.co/';
 
  private objUsuario: Usuario;
  private permisos: Permisos[];


  constructor() {
    this.objUsuario = new Usuario(0, '', '', '', '', '');
  }

  //obtiene la direccion de la web Api
  getDireccion() {
    return this.Url;
  }

  //obtiene la direccion de la web reportes
  getDireccionRepo() {
    return this.UrlRepo;
  }

  getUsuario() {
    return this.objUsuario;
  }

  setUsuario(usu: Usuario) {
    this.objUsuario = usu;
  }

  //obtener y asignar permisos
  getPermisos() {
    return this.permisos;
  }

  setPermisos(permi: Permisos[]) {
    this.permisos = permi;
  }





}
