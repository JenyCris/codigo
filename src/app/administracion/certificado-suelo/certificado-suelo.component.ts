import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { TipoSuelo } from 'src/app/clases/Administracion/TipoSuelo';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DOCUMENT, formatDate } from '@angular/common';
import { AdministracionService } from 'src/app/servicios/Administracion/administracion.service';
import { Router } from '@angular/router';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { CerSuelo } from 'src/app/clases/Administracion/CerSuelo';
import { NormaEOT } from 'src/app/clases/Administracion/NormaEOT';
import { Asignado } from 'src/app/clases/Administracion/Asignado';
import { MisTramitesService } from '../../servicios/Publico/mis-tramites.service';



@Component({
  selector: 'app-certificado-suelo',
  templateUrl: './certificado-suelo.component.html',
  styleUrls: ['./certificado-suelo.component.css']
})
export class CertificadoSueloComponent implements OnInit {

  form: FormGroup;
  IdSolicitud: number;
  listaTipoSuelo: TipoSuelo[];
  listaNormas: NormaEOT[];
  historialCerSuelo: CerSuelo[];
  objNorma: NormaEOT;
  objCerSuelo: CerSuelo;
  objAsignado: Asignado;
  ArregloCerSuelo: Array<CerSuelo> = [];
  ArregloNormas: Array<NormaEOT> = [];
  objHistorial: HistorialTramites;
  spinL: boolean = false; spinTS: boolean = false; spinN: boolean = false; spinG: boolean = false;
  divSuelo: boolean = false; spinI: boolean = false;
  divSolicitud: boolean = true;
  divCertificados: boolean = false;
  today = new Date();
  jstoday = '';
  bandera: boolean = false;
  indice: number = 0;

  constructor(private formBuilder: FormBuilder, private servicioAdmin: AdministracionService, private util: UtilService, private router: Router, private servicioMisTra: MisTramitesService, @Inject(DOCUMENT) private document: Document) {
    this.buildForm();
    this.IdSolicitud = 1;
    this.objHistorial = new HistorialTramites(0, 0, 0, '', '', 0, 0, '', '', '', '', '');
    this.objNorma = new NormaEOT(0,'',0,'','',true);
    this.CargarFecha();
    this.CargarTiposSuelos();
   
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
     
      consecutivo: ['0', [Validators.required]],
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      IdTipoSuelo: ['', [Validators.required]],
      IdNormaEOT: ['', []],
      IdTramite: ['', []],
      IdSolicitud: ['', []],
      correo: ['', []],
      FechaSol: ['', [Validators.required]],
      catastral: ['54172', [Validators.required, Validators.minLength(20), Validators.maxLength(30)]],
    });
  }

  //cargar fecha
  private CargarFecha() {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.form.controls['FechaSol'].setValue(this.jstoday);
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

  //cargar lista de normas
  public CargarNormas() {
    this.listaNormas = []; this.spinN = true;
    this.servicioAdmin.getListaNormas(this.form.value.IdTipoSuelo)
      .subscribe(list => {
        if (list.length > 0) {
          this.listaNormas = list;
          this.spinN = false;
        } else this.util.mensaje('Conexion fallida :(', 'error');
      })
  }


  //mensaje que llega del componente solicitudes
  public Recibemensaje(dato: number) {
    if (dato == 1) {//resolver solicitud
      this.divSolicitud = false;
      this.divSuelo = true;
      this.divCertificados = false;
      this.ResolverSolicitud();
    }

    if (dato == 2) {//modificar radicado
      this.divCertificados = true;
      this.divSolicitud = false;
      this.divSuelo = false;
      this.ModificarRadicado();
    }

    if (dato == 3) {//modificar certificado
      this.divSolicitud = false;
      this.divSuelo = true;
      this.divCertificados = false;
      this.ModificarCertificado();
    }
  }

  //resolver solicitud
  private ResolverSolicitud() {
    this.form.controls['IdSolicitud'].setValue(this.objHistorial.IdSolicitud);
    this.form.controls['nombre'].setValue(this.objHistorial.Nombre);
    this.form.controls['cedula'].setValue(this.objHistorial.Cedula);
    this.form.controls['direccion'].setValue(this.objHistorial.Direccion);
    this.form.controls['telefono'].setValue(this.objHistorial.Telefono);
    this.form.controls['correo'].setValue(this.objHistorial.Correo);
    this.form.controls['catastral'].setValue(this.objHistorial.NumPredial);
    this.form.controls['consecutivo'].setValue(this.objHistorial.Consecutivo);
    this.form.controls['IdTramite'].setValue(this.objHistorial.IdTramite);
  }

  //modificar un radicado
  private ModificarRadicado() {
    this.form.controls['IdSolicitud'].setValue(this.objHistorial.IdSolicitud);
    this.form.controls['nombre'].setValue(this.objHistorial.Nombre);
    this.form.controls['cedula'].setValue(this.objHistorial.Cedula);
    this.form.controls['direccion'].setValue(this.objHistorial.Direccion);
    this.form.controls['telefono'].setValue(this.objHistorial.Telefono);
    this.form.controls['correo'].setValue(this.objHistorial.Correo);
    this.form.controls['catastral'].setValue(this.objHistorial.NumPredial);
    this.form.controls['consecutivo'].setValue(this.objHistorial.Consecutivo);
    this.form.controls['IdTramite'].setValue(this.objHistorial.IdTramite);
  }

  //modificar certificado resuelto
  private ModificarCertificado() {
    this.bandera = true;
    this.servicioAdmin.getCerSuelo(this.objHistorial.IdTramite)
      .subscribe(lis => {
       
        this.historialCerSuelo = [];
        this.ArregloNormas = [];
        this.historialCerSuelo = lis;
        this.objCerSuelo = new CerSuelo(
          lis[0].IdCerUsoSuelo,
          lis[0].IdTramite,
          lis[0].Consecutivo,
          lis[0].Fecha,
          lis[0].direccionIgac,
          lis[0].Elaborado,
          lis[0].Revisado,
          lis[0].Jefe,
          lis[0].IdTipoSuelo,
          lis[0].Estado,
          lis[0].IdNormaEot,
          lis[0].Nombre,
          lis[0].Direccion,
          lis[0].Telefono,
          lis[0].Cedula,          
          lis[0].NumPredial,
          lis[0].Correo);


        this.form.controls['nombre'].setValue(lis[0].Nombre);
        this.form.controls['consecutivo'].setValue(lis[0].Consecutivo);
        this.form.controls['direccion'].setValue(lis[0].Direccion);
        this.form.controls['cedula'].setValue(lis[0].Cedula);
        this.form.controls['telefono'].setValue(lis[0].Telefono);
        this.form.controls['correo'].setValue(lis[0].Correo);
        this.form.controls['catastral'].setValue(lis[0].NumPredial);
        this.form.controls['FechaSol'].setValue(formatDate(lis[0].Fecha, 'yyyy-MM-dd', 'en-US'));
        this.form.controls['IdTipoSuelo'].setValue(lis[0].IdTipoSuelo);
        this.form.controls['IdTramite'].setValue(lis[0].IdTramite);
        this.form.controls['IdNormaEOT'].setValue(lis[0].IdNormaEOT);

        //construimos el detalle
        this.listaNormas = []; this.spinN = true;
        this.servicioAdmin.getListaNormas(this.form.value.IdTipoSuelo)
          .subscribe(list => {
            if (list.length > 0) {
              this.listaNormas = list;
              this.spinN = false;
              this.ConstruirDetalle();
            } else this.util.mensaje('Conexion fallida :(', 'error');
          })
      })
  }


  //mensaje que llega del componente solicitudes
  public RecibeSalida(dato: boolean) {
    if (dato) { this.router.navigate(['/menu']); }
  }

  //mensaje que llega del componente solicitudes
  public RecibeObjeto(dato: HistorialTramites) {
    this.objHistorial = dato;

  }

  //construir detalle del certificado
  private ConstruirDetalle() {
    
    this.ArregloNormas = [];
    for (let i = 0; i < this.historialCerSuelo.length; i++) {
      for (let j = 0; j < this.listaNormas.length; j++) {
        if (this.historialCerSuelo[i].IdNormaEOT == this.listaNormas[j].IdNormaEOT) {
          this.objNorma = new NormaEOT(this.listaNormas[j].IdNormaEOT, this.listaNormas[j].FechaNorma, this.listaNormas[j].IdTipoSuelo, this.listaNormas[j].Titulo, this.listaNormas[j].Contenido, this.listaNormas[j].Estado);
          this.ArregloNormas.push(this.objNorma);
        }
      }
    }
    console.log(this.ArregloNormas);
  }

  //seleccion para borrar detalle
  public SeleccionB(ind) {
    this.indice = ind;
  }

  //eliminar registro de detall
  public Eliminar() {
    if (this.bandera) {
      this.spinG = true;
      this.objAsignado = new Asignado(0, this.objCerSuelo.IdCerUsoSuelo, this.ArregloNormas[this.indice].IdNormaEOT);
      this.servicioAdmin.DeleteCerUsoSueloDetalle(this.objAsignado)
        .subscribe(resp => {
          if (resp == 'ok') {
            this.ArregloNormas.splice(this.indice, 1);
            //this.historialCerSuelo.splice(this.indice, 1);
            this.util.mensaje('Datos actualizados', 'ok');            
            this.spinG = false;
          } else { alert(resp); this.spinG = false; }
        })

    } else { this.ArregloNormas.splice(this.indice, 1); }
  }


  //agregar filas al detalle
  public AgregarFila() {
    for (let i = 0; i < this.listaNormas.length; i++) {
      if (this.listaNormas[i].IdNormaEOT == this.form.value.IdNormaEOT) {
        this.objNorma = new NormaEOT(this.form.value.IdNormaEOT, this.listaNormas[i].FechaNorma, this.listaNormas[i].IdTipoSuelo, this.listaNormas[i].Titulo, this.listaNormas[i].Contenido, this.listaNormas[i].Estado);
      }
    }
     this.ArregloNormas.push(this.objNorma);      
  }


  //enviar certificado
  public Guardar() {
    this.spinG = true;
    
   
    if (this.ArregloNormas.length > 0) {
      if (this.bandera) {// guardar modificacion del certificado
        //construimos la matriz de datos
            for (let i = 0; i < this.ArregloNormas.length; i++) {
              this.objCerSuelo = new CerSuelo(this.objCerSuelo.IdCerUsoSuelo, this.form.value.IdTramite,
                this.form.value.consecutivo, this.form.value.FechaSol,
                this.form.value.direccion, 1, 1, 1, this.form.value.IdTipoSuelo,
                true, this.ArregloNormas[i].IdNormaEOT, this.form.value.nombre,
                this.form.value.direccion, this.form.value.telefono,
                this.form.value.cedula, this.form.value.catastral, this.form.value.correo)
              this.ArregloCerSuelo.push(this.objCerSuelo);
            }
        
            this.servicioAdmin.UpdateCerSuelo(this.ArregloCerSuelo)
            .subscribe(resp => {
              if (resp == 'ok') {
                this.util.mensaje('Datos insertados', 'ok');
                this.spinG = false;
                this.ArregloCerSuelo = [];
                this.volver();
              } else { this.spinG = false; alert(resp); }
            })
      } else {//guardar nuevo certificado
          //construimos la matriz de datos
          for (let i = 0; i < this.ArregloNormas.length; i++) {
            this.objCerSuelo = new CerSuelo(0, this.form.value.IdTramite,
              this.form.value.consecutivo, this.form.value.FechaSol,
              this.form.value.direccion, 1, 1, 1, this.form.value.IdTipoSuelo,
              true, this.ArregloNormas[i].IdNormaEOT, this.form.value.nombre,
              this.form.value.direccion, this.form.value.telefono,
              this.form.value.cedula, this.form.value.catastral, this.form.value.correo)
            this.ArregloCerSuelo.push(this.objCerSuelo);
        }
        
          this.servicioAdmin.InsertarUsoSuelo(this.ArregloCerSuelo)
            .subscribe(resp => {
              if (resp == 'ok') {
                this.util.mensaje('Datos insertados', 'ok');
                this.spinG = false;
                this.volver();
              } else { this.spinG = false; alert(resp); }
            })
        }
    } else { this.util.mensaje('Debe ingresar uso de suelo', 'error'); this.spinG = false; };

  }


  private volver() {
    this.divSolicitud = true;
    this.divSuelo = false;
    this.divCertificados = false;
  }


  //mensaje que llega del componente solicitudes
  public RecibeImprime(dato: HistorialTramites) {

    if (dato.IdEstado == 4) { //esta resuelto y reclamar en oficina
      this.servicioAdmin.getCerSuelo(dato.IdTramite)
        .subscribe(obj => {
          this.RepoCerSuelo(obj[0].IdCerUsoSuelo);
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

  //imprimir certificado
  public RepoCerSuelo(id: number) {
    this.spinI = true;
    this.servicioAdmin.ImprimirCerUsoSuelo(id)
      .subscribe(resp => {
        this.spinI = false;
        this.router.navigate(['/menu']);
        let pdfTramite = window.open("")
        pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
      })
  }

  //imprimir radicado
  public RepoRadicado(id: number) {
    this.spinI = true;
    this.servicioMisTra.ImprimirRadicado(id)
      .subscribe(resp => {
        if (resp.length > 0) {
          this.spinI = false;
          this.router.navigate(['/menu']);
          let pdfTramite = window.open("")
          pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
        } else { alert('No se encuentra documento :('); this.spinI = false; }
      })
  }


}//fin
