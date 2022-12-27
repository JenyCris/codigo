import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { ListaUsuarios } from '../../clases/Administracion/ListaUsuarios';
import { UsuarioService } from 'src/app/servicios/Administracion/usuario.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/Administracion/Usuario';
import { UtilService } from 'src/app/servicios/util.service';



@Component({
  selector: 'app-mis-usuarios',
  templateUrl: './mis-usuarios.component.html',
  styleUrls: ['./mis-usuarios.component.css']
})
export class MisUsuariosComponent implements OnInit {
  divUsuario: boolean = false;
  objUsuario: Usuario;
  ListaUsuario: ListaUsuarios[];
  spinP: boolean = false; spinG: boolean = false;
  bandera: boolean = false;
  form: FormGroup;


  constructor(private servicioUsuario: UsuarioService,private util: UtilService, private formBuilder: FormBuilder) {
    this.buildForm();
    this.objUsuario = new Usuario(0,'','','','','');
    this.CargarUsuarios();
  }

  ngOnInit() {
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      IdUsuario: ['', []],
      NombreCompleto: ['', [Validators.required]],
      Cedula: ['', []],
      Telefono: ['', []],
      Usuario: ['', [Validators.required]],
      Clave: ['', [Validators.required]]
    });
  }

  

  //lista de usuarios
  public CargarUsuarios() {
    this.ListaUsuario = [];
    this.spinP = true;
    this.servicioUsuario.getListaUsuarios()
      .subscribe(list => {
        console.log(list);
        if (list.length > 0) {
          this.ListaUsuario = list;
          this.spinP = false;

        } else this.spinP = false;

      })
  }

  //nuevo usuario
  public Nuevo() {
    this.divUsuario = true;
  }

  //capturar el datos de la fila seleccionada
  public Capturar(obj: any) {
   
    this.objUsuario = new Usuario(obj.IdUsuario,obj.NombreCompleto,obj.Cedula,obj.Telefono,obj.Usuario,obj.Clave);
  }


  public Guardar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.Ingresar();
    }
  }

  private Ingresar() {
    this.spinG = true;
    if (this.bandera) {
      this.objUsuario = new Usuario(this.form.value.IdUsuario, this.form.value.NombreCompleto,this.form.value.Cedula, this.form.value.Telefono, this.form.value.Usuario, this.form.value.Clave);
      this.servicioUsuario.UpdateUsuario(this.objUsuario)
        .subscribe(resp => {
          if (resp) {
            this.spinG = false;
            this.LimpiarCampos();
            this.util.mensaje('Datos actualizados', 'ok');
            this.bandera = false;
            this.CargarUsuarios();
            this.Volver();
          } else this.util.mensaje('Falla actualizando', 'error');
        })

    } else {
      this.objUsuario = new Usuario(0, this.form.value.NombreCompleto, this.form.value.Cedula, this.form.value.Telefono, this.form.value.Usuario, this.form.value.Clave);
      this.servicioUsuario.InsertUsuario(this.objUsuario)
        .subscribe(resp => {
          if (resp == null) {
            this.util.mensaje('Datos ingresados', 'ok');
            this.LimpiarCampos();
            this.CargarUsuarios();
            this.spinG = false;
            this.Volver();
            //this.closeModal.nativeElement.click();
          } else { alert(resp); this.spinG = false; }
        })
    }
  }

  private LimpiarCampos() {
    this.objUsuario = new Usuario(0, '', '', '', '', '');
    this.form.reset();
  }

  public Volver() {
    this.divUsuario = false;
  }


  public Editar() {
    this.bandera = true;
    this.form.controls['IdUsuario'].setValue(this.objUsuario.IdUsuario);
    this.form.controls['NombreCompleto'].setValue(this.objUsuario.NombreCompleto);
    this.form.controls['Cedula'].setValue(this.objUsuario.Cedula);
    this.form.controls['Telefono'].setValue(this.objUsuario.Telefono);
    this.form.controls['Usuario'].setValue(this.objUsuario.Username);
    this.form.controls['Clave'].setValue(this.objUsuario.Clave);
   
    this.CargarUsuarios();
    this.divUsuario = true;

  }



}//fin
