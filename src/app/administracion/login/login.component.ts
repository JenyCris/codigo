import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { Usuario } from '../../clases/Administracion/Usuario';
import { AdministracionService } from '../../servicios/Administracion/administracion.service';
import { BaseService } from '../../servicios/base.service';
import { Permisos } from '../../clases/Administracion/Permisos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() notifyLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyRegistro: EventEmitter<boolean> = new EventEmitter<boolean>();
  listaPermisos: Permisos[];

  objUsuario: Usuario;
  ico: string = '';
  prop: string = '';

  constructor(private util: UtilService, private servicioAdmin: AdministracionService, private base: BaseService) {
    this.objUsuario = new Usuario(0,'','','','','');
    this.ico = this.util.icono('ok', false);
  }

  ngOnInit() {
  }

  //1. evento ENTER para cargar factura y detalle factura
  Entrar(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.Login();
    }
  }

  public Login() {
    if (this.objUsuario.Username.length > 0) {
      if (this.objUsuario.Clave.length > 0) {
        this.ico = this.util.icono('spin', true);
        this.servicioAdmin.getLogin(this.objUsuario)
          .subscribe(list => {
           
            if (list != null) {
              //this.idemp = resp;
              this.objUsuario.IdUsuario = list[0].IdUsuario;
              this.base.setUsuario(this.objUsuario);
              this.ico = this.util.icono('ok', false);
              this.LimpiarCampos();
              //cargamos los permisos
              this.CargarPermisos();

            } else { this.util.mensaje('Usuario o Clave incorrectos', 'danger'); this.ico = this.util.icono('ok', false); }
          })

      } else { this.util.mensaje('Ingresar clave', 'danger'); }
    } else { this.util.mensaje('Ingresar nombre usuario', 'danger'); }

  }

  private LimpiarCampos() {
    this.objUsuario = new Usuario(0, '', '', '', '', '');
    this.ico = this.util.icono('ok', false);
  }

  //cargar permisos
  private CargarPermisos() {
    this.servicioAdmin.getPermisosUsuarios()
      .subscribe(list => {
        if (list.length > 0) {
          this.listaPermisos = list;
          //guardamos los permisos
          this.base.setPermisos(this.listaPermisos);
          this.notifyLogin.emit(true);
        }
      })
  }




}//fin|
