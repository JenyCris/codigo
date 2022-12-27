import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { PublicoModule } from '../publico/publico.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AdministracionModule } from '../administracion/administracion.module';




@NgModule({
  declarations: [PresentacionComponent, SolicitudesComponent],
  imports: [
    
    CommonModule,
    FormsModule,
    PublicoModule
   
  ],
  exports: [PresentacionComponent, SolicitudesComponent]
})
export class CoreModule { }
