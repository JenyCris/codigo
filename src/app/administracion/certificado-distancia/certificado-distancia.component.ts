import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AdministracionService } from 'src/app/servicios/Administracion/administracion.service';
import { TipoSuelo } from 'src/app/clases/Administracion/TipoSuelo';
import { CerDistancia } from 'src/app/clases/Administracion/CerDistancia';
import { HistorialCerDistancia } from 'src/app/clases/Administracion/HistorialCerDistancia';
import { MisTramitesService } from '../../servicios/Publico/mis-tramites.service';

@Component({
  selector: 'app-certificado-distancia',
  templateUrl: './certificado-distancia.component.html',
  styleUrls: ['./certificado-distancia.component.css']
})
export class CertificadoDistanciaComponent implements OnInit {
  IdSolicitud: number;
  form: FormGroup;
  today = new Date();
  jstoday = '';
  spinG: boolean = false; spinTS: boolean = false; spinI: boolean = false;
  divDistancia: boolean = false;
  divSolicitud: boolean = true;
  divCertificados: boolean = false;
  objHistorial: HistorialTramites;
  objHistorialCerDistancia: HistorialCerDistancia;
  objCertificado: CerDistancia;
  listaTipoSuelo: TipoSuelo[];
  bandera: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private servicioAdmin: AdministracionService, private util: UtilService, private servicioMisTra: MisTramitesService) {
    this.buildForm();
    this.objHistorial = new HistorialTramites(0, 0, 0, '', '', 0, 0, '', '', '', '', '');
    this.objCertificado = new CerDistancia(0, 0, 0, '', 0, '', 0, 0, 0, 0, true);
    this.IdSolicitud = 3;
    this.CargarFecha();
    this.CargarTiposSuelos();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      consecutivo: ['', [Validators.required]],
      IdSolicitud: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      FechaSol: ['', [Validators.required]],
      distancia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      IdTipoSuelo: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      correo: ['', []],
      catastral: ['54172', [Validators.required, Validators.minLength(20), Validators.maxLength(30)]],
    });
  }

  //cargar lista de solicitudes
  private CargarTiposSuelos() {
    this.listaTipoSuelo = []; this.spinTS = true;
    this.servicioAdmin.getListaTiposSuelos()
      .subscribe(list => {
        if (list.length > 0) {
          this.listaTipoSuelo = list;
          this.spinTS = false;
        } else this.util.mensaje('Conexion fallida :(', 'error');
      })
  }

  //cargar fecha
  private CargarFecha() {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.form.controls['FechaSol'].setValue(this.jstoday);
  }

  

  //mensaje que llega del componente solicitudes
  public Recibemensaje(dato: number) {
    if (dato == 1) {//resolver solicitud
      this.divSolicitud = false;
      this.divDistancia = true;
      this.divCertificados = false;
    }

    if (dato == 2) {//modificar radicado
      this.divCertificados = true;
      this.divSolicitud = false;
      this.divDistancia = false;
    }

    if (dato == 3) {//modificar certificado
      this.divSolicitud = false;
      this.divDistancia = true;
      this.divCertificados = false;
    }
  }

  //mensaje que llega del componente solicitudes
  public RecibeSalida(dato: boolean) {
    if (dato) { this.router.navigate(['/menu']); }
  }

  //mensaje que llega del componente solicitudes
  public RecibeObjeto(dato: HistorialTramites) {

    if (dato.IdEstado == 1) { //esta radicado
      
      this.objHistorial = dato;
      this.form.controls['consecutivo'].setValue(this.objHistorial.Consecutivo);
      this.form.controls['IdSolicitud'].setValue(this.objHistorial.IdSolicitud);
      this.form.controls['nombre'].setValue(this.objHistorial.Nombre);
      this.form.controls['cedula'].setValue(this.objHistorial.Cedula);
      this.form.controls['direccion'].setValue(this.objHistorial.Direccion);
      this.form.controls['telefono'].setValue(this.objHistorial.Telefono);
      this.form.controls['correo'].setValue(this.objHistorial.Correo);
      this.form.controls['catastral'].setValue(this.objHistorial.NumPredial);
    } else { //se va a modificar

      this.servicioAdmin.getCerDistancia(dato.IdTramite)
        .subscribe(obj => {
         
          this.objCertificado = new CerDistancia(obj[0].IdCerDistancia,
            obj[0].IdTramite,
            obj[0].Consecutivo,
            obj[0].FechaDistancia,
            obj[0].Distancia,
            obj[0].Lugar,
            obj[0].Elaborado,
            obj[0].Revisado,
            obj[0].Jefe,
            obj[0].IdTipoSuelo,
            obj[0].Estado);
          this.form.controls['consecutivo'].setValue(obj[0].Consecutivo);
          this.form.controls['IdSolicitud'].setValue(obj[0].IdSolicitud);
          this.form.controls['nombre'].setValue(obj[0].Nombre);
          this.form.controls['cedula'].setValue(obj[0].Cedula);
          this.form.controls['FechaSol'].setValue(formatDate(obj[0].FechaDistancia, 'yyyy-MM-dd', 'en-US'));
          this.form.controls['direccion'].setValue(obj[0].Direccion);
          this.form.controls['distancia'].setValue(obj[0].Distancia);
          this.form.controls['lugar'].setValue(obj[0].Lugar);
          this.form.controls['telefono'].setValue(obj[0].Telefono);
          this.form.controls['correo'].setValue(obj[0].Correo);
          this.form.controls['catastral'].setValue(obj[0].NumPredial);
          this.form.controls['IdTipoSuelo'].setValue(obj[0].IdTipoSuelo);
        })
    }

  }


  //guardar 
  public Guardar() {
    this.spinG = true;

    if (this.objCertificado.IdCerDistancia == 0) { // hacemos insert
      this.objCertificado = new CerDistancia(0, this.objHistorial.IdTramite, this.form.value.consecutivo, this.form.value.FechaSol, this.form.value.distancia, this.form.value.lugar, 0, 0, 0, this.form.value.IdTipoSuelo, true);
      this.servicioAdmin.InsertCerDistancia(this.objCertificado)
        .subscribe(resp => {
          if (resp == 'ok') {
            this.spinG = false;
            this.util.mensaje('Datos ingresados', 'ok');
            this.form.reset();
            this.router.navigate(['/menu']);
          } else { this.spinG = false; alert(resp); }
        })
    } else { //hacemos update

      this.objHistorialCerDistancia = new HistorialCerDistancia(this.objCertificado.IdTramite,
        this.objHistorial.IdSolicitud, this.objHistorial.IdEstado, this.form.value.nombre, this.form.value.direccion,
        this.form.value.telefono, this.form.value.cedula, this.form.value.catastral, this.form.value.FechaSol, this.form.value.correo,
        this.objHistorial.NombreSolicitud, this.objCertificado.IdCerDistancia, this.form.value.consecutivo,
        this.form.value.FechaSol, this.form.value.distancia,this.form.value.lugar, this.objCertificado.Elaborado,
        this.objCertificado.Revisado, this.objCertificado.Jefe, this.form.value.IdTipoSuelo, this.objCertificado.Estado);


      this.servicioAdmin.UpdateCerDistancia(this.objHistorialCerDistancia)
        .subscribe(resp => {
          if (resp == 'ok') {
            this.spinG = false;
            this.util.mensaje('Datos ingresados', 'ok');
            this.form.reset();
            this.router.navigate(['/menu']);
          } else { this.spinG = false; alert(resp); }
        })
    }

  }

  //mensaje que llega del componente solicitudes
  public RecibeImprime(dato: HistorialTramites) {
   
    if (dato.IdEstado == 4) { //esta resuelto y reclamar en oficina
      this.servicioAdmin.getCerDistancia(dato.IdTramite)
        .subscribe(obj => {
          this.RepoDistancia(obj[0].IdCerDistancia);
          this.spinI = false;
        })
    } else {
      if (dato.IdEstado == 1) {//esta radicado
        this.RepoRadicado(dato.IdTramite);
      } else {
        this.util.mensaje('No es posible imprimir', 'error');
        this.spinI = false;
        this.router.navigate(['/menu']);
      }
    }
  }


  //imprimir radicado
  public RepoRadicado(id: number) {
    this.spinI = true;
    this.servicioMisTra.ImprimirRadicado(id)
      .subscribe(resp => {
        if (resp.length > 0) {
          this.spinI = false;
          let pdfTramite = window.open("")
          pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
          this.router.navigate(['/menu']);
        } else { alert('No se encuentra documento :('); this.spinI = false; }
      })
  }


  //imprimir radicado
  public RepoDistancia(id: number) {
    this.spinI = true;
    this.servicioAdmin.ImprimirCerDistancia(id)
      .subscribe(resp => {
        this.spinI = false;
        this.router.navigate(['/menu']);
        let pdfTramite = window.open("")
        pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
      })
  }



}//fin
