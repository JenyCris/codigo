import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { RadicadoService } from '../../servicios/Radicado/radicado.service';
import { Radicado } from '../../clases/Radicado/Radicado';
import { UtilService } from '../../servicios/util.service';
import { formatDate } from '@angular/common';
import { ListaRadicado } from '../../clases/Radicado/ListaRadicado';


@Component({
  selector: 'app-radicados',
  templateUrl: './radicados.component.html',
  styleUrls: ['./radicados.component.css']
})
export class RadicadosComponent implements OnInit {
  today = new Date();
  jstoday = '';
  jstoday2 = '';
  fecha: string = '';
  FechaInicial: string;
  FechaFinal: string;
  spinR: boolean = false;
  listaRadicado: ListaRadicado[];
  nuevo: boolean = false;
  objRadicado: Radicado;
  spinG: boolean = false;


  constructor(private ServicioRadicado: RadicadoService, private util: UtilService) {
    this.objRadicado = new Radicado(0, 0, 0, '', '', '', '', '', '', 0, '');
    this.CargarFecha();
    this.HistorialRadicado();
  }

  ngOnInit() {
  }

  //cargar fecha
  private CargarFecha() {
    this.jstoday = formatDate(this.today, 'yyyy-MM-ddTHH:mm', 'en-US');
    this.jstoday2 = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.fecha = this.jstoday;
    //this.objRadicado.Fecha = this.jstoday;
    this.FechaInicial = this.jstoday2;
    this.FechaFinal = this.jstoday2;
  }

  //crear radicado
  public NuevoRadicado() {
    this.nuevo = true;
  }

  //volver
  public Volver() {
    this.nuevo = false;
  }

  //bucar lista de radicados
  public HistorialRadicado() {
   
      this.spinR = true;
      this.listaRadicado = [];
      this.ServicioRadicado.getHistorialRadicados(this.FechaInicial, this.FechaFinal)
        .subscribe(list => {
          if (list.length > 0) {
            this.listaRadicado = list; this.spinR = false;
          } else this.spinR = false;
          
        })
   
  }

  //bucar lista de radicados
  //public BuscarListaRadicado() {
   
  //    this.spinR = true;
  //    this.listaRadicado = [];
  //    this.ServicioRadicado.getListaRadicados(this.FechaInicial, this.FechaFinal, this.Cedula)
  //      .subscribe(list => {
  //        if (list.length > 0) {
  //          this.listaRadicado = list; this.spinR = false;
  //          this.nombre = this.listaRadicado[0].NombreCompleto;
  //        } else { alert('El numero de cedula ingresado no tiene tramites radicados..'); this.spinR = false; }
  //      })
    
  //}

  public limpiarCampos() {
    this.objRadicado = new Radicado(0, 0, 0, '', '', '', '', '', '', 0, '');
    this.CargarFecha();
  }



  //guardar datos
  public Guardar() {
    this.objRadicado.Fecha = this.fecha;
    this.objRadicado.IdEstado = 1;
    this.objRadicado.IdSolicitud = 5;
    console.log(this.objRadicado);
    if (this.objRadicado.NombreCompleto.length > 0) {
                this.spinG = true;
                this.ServicioRadicado.InsertRadicado(this.objRadicado)
                  .subscribe(resp => {
                    if (resp) {
                      this.util.mensaje('Datos ingresados','sucess');
                      //this.content.open();
                      this.spinG = false;
                      this.limpiarCampos();
                      this.Volver();
                    } else { alert('Falla enviando radicado'); this.spinG = false; }
                  });
    } else alert('Ingresar nombre del solicitante');
  }



}//Fin
