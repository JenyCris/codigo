import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { Permisos } from '../../clases/Administracion/Permisos';
import { BaseService } from '../../servicios/base.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  listaPermisos: Permisos[];
  arregloComponentes: Array<Permisos> = [];

  constructor(private base: BaseService) {
    this.listaPermisos = [];
    this.listaPermisos = this.base.getPermisos();
    this.CargarComponentes(1);
  }

  public CargarComponentes(item) {
   
    this.arregloComponentes = [];

    for (let i = 0; i < this.listaPermisos.length; i++) {
      if (this.listaPermisos[i].IdModulo == item) {
        this.arregloComponentes.push(this.listaPermisos[i]);
      }
    }
    //console.log(this.arregloComponentes);
  }

  ngOnInit() {
  }

}
