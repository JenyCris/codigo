import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { CertificadosService } from '../../servicios/Publico/certificados.service';
import { Radicado } from '../../clases/Radicado/Radicado';
import { Tramite } from '../../clases/Publico/Tramite';
import { UtilService } from '../../servicios/util.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { InicioService } from '../../servicios/Publico/inicio.service';
import { Solicitud } from '../../clases/Publico/Solicitud';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime, debounce } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

//import { } from '../inicio/'

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  
  @Output() Notificacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() Titulo: string = '';
  @Input() objHistorial: HistorialTramites;
  @Output() notifySalir: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('content') content: any;
  objTramite: Tramite;
  objSolicitud: Solicitud;
  listaSolicitud: Solicitud[];
  miTitulo: string = 'Certificados';
  bandera: boolean = false;
  spinG: boolean = false; spinR: boolean = false;
  mostrar: boolean = true;
  mensaje: boolean = false;
  objRadicado: Radicado;
  today = new Date();
  jstoday = '';
  jstoday2 = '';
  fecha: string = '';
  FechaInicial: string;
  FechaFinal: string;
  E_catastro: boolean = false;
  solicitudes: boolean = false;
  spinS: boolean = false;
  Cedula: string = '';
  nombre: string = '';
  num: string = '';
  form: FormGroup;
  //listaCertificados = ['Certificado Uso de suelo','Certificado Distancia','Certificado Nomenclatura'];
  myPattern = "[0-9]";
  pattern = "/^\d[0,9]$/";
  
  

  constructor(private ServicioCertificados: CertificadosService, private util: UtilService, private router: Router, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {
    this.mostrar = true;
    this.objHistorial = new HistorialTramites(0, 0, 0, '', '', 0, 0, '', '', '', '', '');
    this.objSolicitud = new Solicitud(0, '');
    this.objTramite = new Tramite(0, 0, 0, '', '', null, null, '', '','');
    this.CargarFecha();
    this.CargarSolicitudes();
    this.buildForm();
  }

  ngOnInit() {
    if (this.objHistorial.IdSolicitud > 0) {
      this.bandera = true;
      this.CargarDatos();
    } else this.bandera = false;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      IdSolicitud: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', []],
      catastral: ['54172', [Validators.required, Validators.minLength(20), Validators.maxLength(30)]],
    });

    //this.form.valueChanges
    //  .pipe(
    //    debounceTime(500)
    //  )
    //  .subscribe(value => {
    //    console.log(value);
    //  });
  }

  //mensaje para salir
  public Salir() {
    this.notifySalir.emit(true);
  }

  //cargar lista de solicitudes
  private CargarSolicitudes() {
    this.listaSolicitud = []; this.spinS = true;
    this.ServicioCertificados.getListaSolicitudes()
      .subscribe(list => {
        if (list.length > 0) {
          this.listaSolicitud = list;
          this.spinS = false;
        } else this.util.mensaje('Conexion fallida :(', 'warning');
      })
  }


  //enviar mensaje para ocultar
  public Volver() {
    this.Notificacion.emit(true);
  }

  public cargarForma(id: number) {
    for (let i = 0; i < this.listaSolicitud.length; i++) {
      if (id==this.listaSolicitud[i].IdSolicitud) {
        this.miTitulo = this.listaSolicitud[i].NombreSolicitud;
      }
    }
  }

  

  //cargar fecha
  private CargarFecha() {
    this.jstoday = formatDate(this.today, 'yyyy-MM-ddTHH:mm', 'en-US');
    //this.jstoday2 = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.fecha = this.jstoday;
  }

  //limpiar
  private limpiarCampos() {
    this.objTramite = new Tramite(0, 0, 0, '', '', null, null, '', '', '');
    this.form.reset();
    this.CargarFecha();
  }

  //guardar tramite
  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      if (this.bandera) {
        this.objTramite = new Tramite(this.objHistorial.IdTramite, value.IdSolicitud, 1, value.nombre, value.direccion, value.telefono, value.cedula, value.catastral, this.objHistorial.Fecha, value.correo);
        this.spinG = true;
        this.Salir();
        this.ServicioCertificados.UpdateTramite(this.objTramite)
          .subscribe(resp => {
            if (resp) {
              this.util.mensaje('Datos ingresados', 'ok'); this.spinG = false;
              this.limpiarCampos();
              this.Notificacion.emit(true);
              this.bandera = false;
            } else { this.util.mensaje('Falla actualizando', 'error'); this.spinG = false;}
          })
      } else {
        this.objTramite = new Tramite(0, value.IdSolicitud, 1, value.nombre, value.direccion, value.telefono, value.cedula, value.catastral, this.fecha, value.correo);
        this.spinG = true;

        this.ServicioCertificados.InsertTramite(this.objTramite)
          .subscribe(resp => {
            if (resp == 'ok') {
              this.spinG = false;
              this.limpiarCampos();
              this.mostrar = false;
              //this.Notificacion.emit(true);
              this.mensaje = true;
            } else { alert(resp); this.spinG = false; }
          });
      }
    }
  }

  //mensaje que llega del componente solicitudes
  public CargarDatos() {
      this.form.controls['IdSolicitud'].setValue(this.objHistorial.IdSolicitud);
      this.form.controls['nombre'].setValue(this.objHistorial.Nombre);
      this.form.controls['cedula'].setValue(this.objHistorial.Cedula);
      this.form.controls['direccion'].setValue(this.objHistorial.Direccion);
      this.form.controls['telefono'].setValue(this.objHistorial.Telefono);
      this.form.controls['correo'].setValue(this.objHistorial.Correo);
      this.form.controls['catastral'].setValue(this.objHistorial.NumPredial);
  }


  //tutorial
  public miTuto() {
    const link = this.document.createElement('a');
    link.target = '_blank';
    link.href = 'https://www.youtube.com/watch?v=zzMnzbfCB94';
    link.click();
    link.remove();
  }



}
