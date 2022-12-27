import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { Estados } from '../../clases/Administracion/Estados';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { AdministracionService } from '../../servicios/Administracion/administracion.service';
import { UtilService } from '../../servicios/util.service';
import { MisTramitesService } from '../../servicios/Publico/mis-tramites.service';
import { Tramite } from '../../clases/Publico/Tramite';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  //form: FormGroup;
  @ViewChild('cerrarModal') closeModal: ElementRef;
  spinE: boolean = false; spinH: boolean = false; spinI: boolean = false;
  objEstados: Estados;
  objHistorial: HistorialTramites;
  objTramite: Tramite;
  listEstados: Estados[];
  listaHistorialTramites: HistorialTramites[];
  miCedula: number;
  NombreBuscar: string = null;
  busqueda: boolean = false;

  constructor(private servicioAdmin: AdministracionService, private util: UtilService, private servicioMisTra: MisTramitesService) {
   
    this.objEstados = new Estados(0, '');
    this.objHistorial = new HistorialTramites(0, 0, 0, '', '', 0, 0, '', '', '', '', '');
    this.objTramite = new Tramite(0, 0, 0, '', '', 0, 0, '', '', '');
    this.CargarEstados();
    
  }

  ngOnInit() {
    this.CargarHistorial(1, 'todos');
  }

  //metodo para pintar celdas de tablas y listas
  private PintarCeldas() {
    //pintamos los insumos sin candidad disponible
    for (let w = 0; w < this.listaHistorialTramites.length; w++) {
      if (this.listaHistorialTramites[w].IdEstado == 4) { // reclamar en oficina
        this.listaHistorialTramites[w].css = "table-success";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-success list-group-item-action";
      }
      if (this.listaHistorialTramites[w].IdEstado == 8) { // incompleto
        this.listaHistorialTramites[w].css = "table-danger";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-danger list-group-item-action";
      }

      if (this.listaHistorialTramites[w].IdEstado == 3) { // en proceso
        this.listaHistorialTramites[w].css = "table-warning";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-warning list-group-item-action";
      }

      if (this.listaHistorialTramites[w].IdEstado == 1) { // radicado
        this.listaHistorialTramites[w].css = "table-light";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-light list-group-item-action";
      }

      if (this.listaHistorialTramites[w].IdEstado == 0) { // anulado
        this.listaHistorialTramites[w].css = "table-dark";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-dark list-group-item-action";
      }

      if (this.listaHistorialTramites[w].IdEstado == 7) { // entregado
        this.listaHistorialTramites[w].css = "table-success";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-success list-group-item-action";
      }

      switch (this.listaHistorialTramites[w].IdSolicitud) {
        case 1: { this.listaHistorialTramites[w].Letra = 'S'; break; }
        case 2: { this.listaHistorialTramites[w].Letra = 'N'; break; }
        case 3: { this.listaHistorialTramites[w].Letra = 'D'; break; }
      }

    


    }
  }

  //cargar lista de solicitudes
  private CargarEstados() {
    this.listEstados = []; this.spinE = true;
    this.servicioAdmin.getListaEstados()
      .subscribe(list => {
        if (list.length > 0) {
          this.listEstados = list;
          this.spinE = false;
        } else this.util.mensaje('Conexion fallida :(', 'warning');
      })
  }

  //cargar lista de solicitudes por cedula y estado
  public CargarHistorialCE() {
    if (this.miCedula > 0) {
      if (this.objEstados.IdEstado >= 0) {
        this.listaHistorialTramites = []; this.spinH = true;
        this.servicioMisTra.getHistorialTramites(this.miCedula, this.objEstados.IdEstado)
          .subscribe(list => {
            if (list.length > 0) {
              this.listaHistorialTramites = list;
              this.spinH = false;
              this.PintarCeldas();
            } else {  this.spinH = false; }
          })
      } else alert('Seleccione un estado');
    } else alert('Ingresar identificación');
  }


  //metodo para buscar a medida que se escribe
  public KeyUpNombreBuscar() {
    if (this.NombreBuscar.length > 3) { //empiezamos a escribir
      if (!this.busqueda) { //boton apagado
        this.CargarHistorial(1, this.NombreBuscar);
      }
      else {
        this.CargarHistorial(-1, this.NombreBuscar);
      }
    } else { //empezamos a borrar lo escrito
      if (!this.busqueda) { //boton apagado
        this.CargarHistorial(1, 'todos');
      } else { //boton encendido
        this.CargarHistorial(-1, 'todos');
      }
    }
    
  }


  //cargar lista de solicitudes
  public CargarHistorial(IdEstado: number, Nombre: string) {
    this.listaHistorialTramites = []; this.spinH = true;
    this.servicioMisTra.getTramitesFiltro(IdEstado, 0, Nombre)
      .subscribe(list => {
        if (list.length > 0) {
          this.listaHistorialTramites = list;
          this.spinH = false;
          this.PintarCeldas();
        } else {
          this.spinH = false;
        }
      })
  }

  //buscar todos los certificados para todos los estados y nombres
  public BuscarTodos() {
    this.NombreBuscar = null;
    if (!this.busqueda) {
      this.CargarHistorial(-1, 'todos');
    } else this.CargarHistorial(1, 'todos');
  }



  //cargar lista de solicitudes
  //public CargarHistorial() {
  //      this.listaHistorialTramites = []; this.spinH = true;
  //      this.servicioMisTra.getTodosTramites()
  //        .subscribe(list => {
  //          if (list.length > 0) {
  //            this.listaHistorialTramites = list;
  //            this.spinH = false;
  //            this.PintarCeldas();
  //          } else {  this.spinH = false; }
  //        })
  //}


  //cargar lista de solicitudes
  //public CargarHistorial2() {
  //  if (this.miCedula > 0) {
  //    this.listaHistorialTramites = []; this.spinH = true;
  //    this.servicioMisTra.getHistorialTramitest(this.miCedula)
  //      .subscribe(list => {
  //        if (list.length > 0) {
  //          this.listaHistorialTramites = list;
  //          this.spinH = false;
  //          this.PintarCeldas();
  //        } else {  this.spinH = false; }
  //      })
  //  } else alert('Ingresar identificación');
  //}

  //cargar lista de solicitudes por estado
  public CargarHistorial3() {
    
      if (this.objEstados.IdEstado >= 0) {
        this.listaHistorialTramites = []; this.spinH = true;
        this.servicioMisTra.getTramitesEstado(this.objEstados.IdEstado)
          .subscribe(list => {
            if (list.length > 0) {
              this.listaHistorialTramites = list;
              this.spinH = false;
              this.PintarCeldas();
            } else {  this.spinH = false; }
          })
      } else alert('Seleccione un estado');
   
  }


  //1. evento ENTER para cargar factura y detalle factura
  //Buscar(event: KeyboardEvent) {
  //  if (event.keyCode == 13) {
  //    this.CargarHistorial2();
  //  }
  //}

  //seleccion de tramite en la tabla
  public Seleccion(obj:HistorialTramites) {
    this.objTramite = new Tramite(obj.IdTramite,obj.IdSolicitud,obj.IdEstado,obj.Nombre,obj.Direccion,obj.Telefono,obj.Cedula,obj.NumPredial,obj.Fecha,obj.Correo);
  }


  //metodo para actualizar tramite
  public actualizarTramite(obj: Estados) {
    this.spinI = true;
    this.objTramite.IdEstado = obj.IdEstado;
    this.servicioMisTra.UpdateEstadoTramite(this.objTramite)
      .subscribe(resp => {
        if (resp) {
          this.closeModal.nativeElement.click();
          this.spinI = false;
          this.busqueda = false;
          this.CargarHistorial(1, 'todos');
        } else { alert('Falla actualizando'); this.spinI = false;}
        
      })
  }

 



  public Imprimir() {
    this.RepoRadicado(this.objTramite.IdTramite);
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
        } else { alert('No se encuentra documento :('); this.spinI = false;}
      })
  }

  //imprimir nomenclatura
  public RepoNomenclatura(id: number) {
    this.spinI = true;
    this.servicioAdmin.ImprimirCerNomenclatura(id)
      .subscribe(resp => {
        this.spinI = false;
        let pdfTramite = window.open("")
        pdfTramite.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.toString()) + "' allow='fullscreen 'true'' ></iframe>");
      })
  }



}//fin
