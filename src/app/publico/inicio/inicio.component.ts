import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { AdministracionService } from '../../servicios/Administracion/administracion.service';
import { UtilService } from '../../servicios/util.service';
import { BaseService } from '../../servicios/base.service';
import { Permisos } from '../../clases/Administracion/Permisos';
import { Usuario } from '../../clases/Administracion/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  mostrar: boolean = true;
  @Input() resp: boolean;
  @Output() notifyInicio: EventEmitter<boolean> = new EventEmitter<boolean>(); //mensaje que se envia para mostrar u ocultar el inicio en el appcomponent html
  @Output() notifyLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('cerrarModal') closeModal: ElementRef;
  titulo: string;
  mensaje: string = '';
  listaPermisos: Permisos[];
  objUsuario: Usuario;
  spinM: boolean = false;

  constructor(private util: UtilService, private servicioAdmin: AdministracionService, private base: BaseService, private route: Router) {
    this.objUsuario = new Usuario(0, '', '', '', '', '');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   
  }


  //eventos click para certificados.............
  public Requisitos() {
    this.notifyInicio.emit(false);
    this.mostrar = false;
  }

  public misTramites() {
    this.notifyInicio.emit(false);
    this.mostrar = false;
  }

  public certificados() {
    this.notifyInicio.emit(false);
    this.mostrar = false;
  }


  //evento que recibe notificacion para ocultar
  RecibeNotificacion(resp: boolean) {
    this.mostrar = resp;
  }


  //todo lo relacionado a login:

  //1. evento ENTER 
  Entrar(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.Login();
    }
  }

  public Login() {
    this.spinM = true;
    if (this.objUsuario.Username.length > 0) {
      if (this.objUsuario.Clave.length > 0) {
        this.servicioAdmin.getLogin(this.objUsuario)
          .subscribe(list => {
            if (list != null) {
              this.objUsuario.IdUsuario = list[0].IdUsuario;
              this.base.setUsuario(this.objUsuario);
              this.LimpiarCampos();
              //cargamos los permisos
              this.CargarPermisos();
              this.spinM = false;
            } else { this.util.mensaje('Usuario o Clave incorrectos', 'danger'); this.spinM = false;}
          })
      } else { this.util.mensaje('Ingresar clave', 'danger'); }
    } else { this.util.mensaje('Ingresar nombre usuario', 'danger'); }
  }

  //cargar permisos
  private CargarPermisos() {
   
    this.servicioAdmin.getPermisosUsuarios()
      .subscribe(list => {
        if (list.length > 0) {
          this.listaPermisos = list;
          //guardamos los permisos
          this.base.setPermisos(this.listaPermisos);
          this.notifyInicio.emit(false);
          this.closeModal.nativeElement.click();
          this.spinM = false;
          this.route.navigate(['/menu']); // navigate to other page
        }
      })
  }

  private LimpiarCampos() {
    this.objUsuario = new Usuario(0, '', '', '', '', '');
  }


}//fin
