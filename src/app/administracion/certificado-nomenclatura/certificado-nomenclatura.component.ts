import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AdministracionService } from 'src/app/servicios/Administracion/administracion.service';
import { TipoSuelo } from 'src/app/clases/Administracion/TipoSuelo';
import { CerNomenclatura } from 'src/app/clases/Administracion/CerNomenclatura';
import { HistorialCerNomenclatura } from 'src/app/clases/Administracion/HistorialCerNomenclatura';
import { MisTramitesService } from '../../servicios/Publico/mis-tramites.service';
import { log } from 'util';


@Component({
  selector: 'app-certificado-nomenclatura',
  templateUrl: './certificado-nomenclatura.component.html',
  styleUrls: ['./certificado-nomenclatura.component.css']
})
export class CertificadoNomenclaturaComponent implements OnInit {
  
  form: FormGroup;
  @Output() notifyObjetoR: EventEmitter<HistorialTramites> = new EventEmitter<HistorialTramites>();
  spinG: boolean = false; spinTS: boolean = false; spinI: boolean = false;
  divNomenclatura: boolean = false;
  divSolicitud: boolean = true;
  divCertificados: boolean = false;
  objHistorial: HistorialTramites;
  objCertificado: CerNomenclatura;
  objHistorialCerNomenclatura: HistorialCerNomenclatura;
  IdSolicitud: number;
  today = new Date();
  jstoday = '';
  listaTipoSuelo: TipoSuelo[];
  bandera: boolean = true;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private servicioAdmin: AdministracionService, private util: UtilService, private servicioMisTra: MisTramitesService ) {
    this.buildForm();
    this.objHistorial = new HistorialTramites(0, 0, 0, '', '', 0, 0, '', '', '', '', '');
    this.objCertificado = new CerNomenclatura(0, 0, 0, '', '', 0, 0, 0, 0, true);
    this.IdSolicitud = 2;
    this.CargarFecha();
    this.CargarTiposSuelos();
    this.bandera = true;
  }

  ngOnInit() {
    
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


  private buildForm() {
    this.form = this.formBuilder.group({
      consecutivo: ['0', [Validators.required]],
      IdSolicitud: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      FechaSol: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      direccionIgac: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      IdTipoSuelo: ['', [Validators.required]],
      correo: ['', []],
      catastral: ['54172', [Validators.required, Validators.minLength(20), Validators.maxLength(30)]],
    });
  }

  

  //mensaje que llega del componente solicitudes
  public Recibemensaje(dato: number) {
    if (dato == 1) {//resolver solicitud
      this.divSolicitud = false;
      this.divNomenclatura = true;
      this.divCertificados = false;
    }

    if (dato == 2) {//modificar radicado
      this.divCertificados = true;
      this.divSolicitud = false;
      this.divNomenclatura = false;   
    }

    if (dato == 3) {//modificar certificado
      this.divSolicitud = false;
      this.divNomenclatura = true;
      this.divCertificados = false;
    }
  }

  //mensaje que llega del componente solicitudes
  public RecibeSalida(dato: boolean) {
    if (dato) { this.router.navigate(['/menu']); }
  }


  //mensaje que llega del componente solicitudes
  public RecibeObjeto(dato: HistorialTramites) {
    this.objHistorial = dato;
    
    if (dato.IdEstado == 1) { //esta radicado para resolver
      this.objHistorial = dato;
      this.form.controls['IdSolicitud'].setValue(this.objHistorial.IdSolicitud);
      this.form.controls['nombre'].setValue(this.objHistorial.Nombre);
      this.form.controls['cedula'].setValue(this.objHistorial.Cedula);
      //this.form.controls['FechaSol'].setValue(formatDate(this.objHistorial.Fecha, 'yyyy-MM-dd', 'en-US'));
      this.form.controls['direccion'].setValue(this.objHistorial.Direccion);
      this.form.controls['direccionIgac'].setValue(this.objHistorial.Direccion);
      this.form.controls['telefono'].setValue(this.objHistorial.Telefono);
      this.form.controls['correo'].setValue(this.objHistorial.Correo);
      this.form.controls['catastral'].setValue(this.objHistorial.NumPredial);
      this.form.controls['consecutivo'].setValue(this.objHistorial.Consecutivo);
    } else { //se va a modificar
      
      this.servicioAdmin.getCerNomenclatura(dato.IdTramite)
        .subscribe(obj => {
          //console.log(obj);
          if (obj.length > 0) {
            this.objCertificado = new CerNomenclatura(obj[0].IdCerNomenclatura,
              obj[0].IdTramite,
              obj[0].Consecutivo,
              obj[0].FechaNomenclatura,
              obj[0].direccionIgac,
              obj[0].Elaborado,
              obj[0].Revisado,
              obj[0].Jefe,
              obj[0].IdTipoSuelo,
              obj[0].Estado);
            this.form.controls['consecutivo'].setValue(obj[0].Consecutivo);
            this.form.controls['IdSolicitud'].setValue(obj[0].IdSolicitud);
            this.form.controls['nombre'].setValue(obj[0].Nombre);
            this.form.controls['cedula'].setValue(obj[0].Cedula);
            this.form.controls['FechaSol'].setValue(formatDate(obj[0].FechaNomenclatura, 'yyyy-MM-dd', 'en-US'));
            this.form.controls['direccion'].setValue(obj[0].Direccion);
            this.form.controls['direccionIgac'].setValue(obj[0].DireccionIgac);
            this.form.controls['telefono'].setValue(obj[0].Telefono);
            this.form.controls['correo'].setValue(obj[0].Correo);
            this.form.controls['catastral'].setValue(obj[0].NumPredial);
            this.form.controls['IdTipoSuelo'].setValue(obj[0].IdTipoSuelo);
          } else { this.util.mensaje('No es posible editar trámite','error'); }
        })
    }
  }



  //mensaje que llega del componente solicitudes
  public RecibeImprime(dato: HistorialTramites) {

    if (dato.IdEstado == 4) { //esta resuelto y reclamar en oficina
      this.servicioAdmin.getCerNomenclatura(dato.IdTramite)
        .subscribe(obj => {
          this.RepoNomenclatura(obj[0].IdCerNomenclatura);
          this.spinI = false;
        })
    } else {
      if (dato.IdEstado == 1) { //esta radicado
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



  //guardar 
  public Guardar() {
    this.spinG = true;
    if (this.objCertificado.IdCerNomenclatura == 0) { // hacemos insert
      this.objCertificado = new CerNomenclatura(0, this.objHistorial.IdTramite, this.form.value.consecutivo, this.form.value.FechaSol, this.form.value.direccionIgac, 0, 0, 0, this.form.value.IdTipoSuelo, true);
      this.servicioAdmin.InsertCerNomenclatura(this.objCertificado)
        .subscribe(resp => {
          if (resp == 'ok') {
            this.spinG = false;
            this.util.mensaje('Datos ingresados', 'ok');
            this.form.reset();
            this.router.navigate(['/menu']);
          } else { this.spinG = false; alert(resp); }
        })
    } else { //hacemos update
      
      this.objHistorialCerNomenclatura = new HistorialCerNomenclatura(this.objCertificado.IdTramite,
        this.objHistorial.IdSolicitud, this.objHistorial.IdEstado, this.form.value.nombre, this.form.value.direccion,
        this.form.value.telefono, this.form.value.cedula, this.form.value.catastral, this.form.value.FechaSol, this.form.value.correo,
        this.objHistorial.NombreSolicitud, this.objCertificado.IdCerNomenclatura, this.form.value.consecutivo,
        this.form.value.FechaSol, this.form.value.direccionIgac, this.objCertificado.Elaborado,
        this.objCertificado.Revisado, this.objCertificado.Jefe, this.form.value.IdTipoSuelo,this.objCertificado.Estado);
     

      this.servicioAdmin.UpdateCerNomenclatura(this.objHistorialCerNomenclatura)
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

 

  //imprimir radicado
  public RepoNomenclatura(id: number) {
    this.spinI = true;
    this.servicioAdmin.ImprimirCerNomenclatura(id)
      .subscribe(resp => {
        this.spinI = false;
        this.router.navigate(['/menu']);
        let pdfTramite = window.open("")
        pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
      })
  }

  //metodo para actualizar tramite
  //public ActualizarTramite() {
  //  this.spinI = true;
  //  this.objTramite.IdEstado = obj.IdEstado;
  //  this.servicioMisTra.UpdateEstadoTramite(this.objTramite)
  //    .subscribe(resp => {
  //      if (resp) {
  //        this.closeModal.nativeElement.click();
  //        this.spinI = false;
  //        this.CargarHistorial();
  //      } else { alert('Falla actualizando'); this.spinI = false; }

  //    })
  //}



}//fin
