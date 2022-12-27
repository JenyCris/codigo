import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { Permisos } from '././clases/Administracion/Permisos';
import { BaseService } from './servicios/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('cerrarModal') closeModal: ElementRef;
  title = 'Control';
  barra: boolean;
  miBarra: boolean = true;
  barrab: boolean;
  registro: boolean;
  presentacion: boolean;
  evento: boolean;
  listaPermisos: Permisos[];
  arregloModulos: Array<Permisos> = [];
  arregloComponentes: Array<Permisos> = [];

  constructor(private base: BaseService) {
    this.barrab = true;
    this.barra = false;
    this.registro = false;
    this.presentacion = true;
    
  }

  //mensaje que llega de login
  public onNotifyLogin(dato: boolean) {
    if (dato) {
      this.closeModal.nativeElement.click();
      this.barrab = false;
      this.barra = true;
      this.presentacion = false;
      this.listaPermisos = this.base.getPermisos();
      this.CargarModulos();
    }
  }

  //mensaje que llega del componente de inicio
  public recibeMensaje(dato: boolean) {
    this.presentacion = dato; //para ocultar o mostrar el inicio
  }

  //cargar modulos
  private CargarModulos() {
    let dato = false;
    for (let i = 0; i < this.listaPermisos.length; i++) {
      if (this.arregloModulos.length == 0) { this.arregloModulos.push(this.listaPermisos[i]); }
      else {
        for (let j = 0; j < this.arregloModulos.length; j++) {
          if (this.listaPermisos[i].IdModulo == this.arregloModulos[j].IdModulo) {
            dato = false; j = this.arregloModulos.length;
          } else { dato = true; }
        }
        if (dato) { this.arregloModulos.push(this.listaPermisos[i]); }
      }
    }
  }

  public CargarComponentes(item) {
    this.evento = true;
    this.arregloComponentes = [];

    for (let i = 0; i < this.listaPermisos.length; i++) {
      if (this.listaPermisos[i].IdModulo == item) {
        this.arregloComponentes.push(this.listaPermisos[i]);
      }
    }
    //console.log(this.arregloComponentes);
  }

  public Ocultar() {
    this.evento = false;
  }

  //mensaje que llega de registro
  public onNotifyRegistro(dato: boolean) {
    if (dato) {
      this.barrab = true;
      this.barra = false;
      this.presentacion = false;
      this.registro = true;
    }
  }

  //mensaje que llega de login
  public onNotifyConfirmacion(dato: boolean) {
    if (!dato) {
      this.barrab = true;
      this.barra = false;
      this.presentacion = true;
      this.registro = false;
    }
  }


  private Cancelar() {
    this.barrab = true;
    this.barra = false;
    this.presentacion = true;
  }

 

}//fin
