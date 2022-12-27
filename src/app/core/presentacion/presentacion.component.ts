import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
  mostrar: boolean = true;
  @Input() resp: boolean;
  titulo: string;

  constructor() { }

  ngOnInit() {
  }

  //eventos click para certificados.............

  public MiPerfil() {
    this.mostrar = false;
    this.titulo = 'Mi Perfil';
  }

  public UsoSuelo() {
    this.mostrar = false;
    this.titulo = 'Certificado de uso de suelo';
  }

  public Nomenclatura() {
    this.mostrar = false;
    this.titulo = 'Certificado de nomenclatura';
  }

  public Distancia() {
    this.mostrar = false;
    this.titulo = 'Certificado de distancia';
  }

  //evento que recibe notificacion para ocultar
  RecibeNotificacion(resp: boolean) {
    this.mostrar = resp;
  }

 

}
