import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CertificadosComponent } from './certificados/certificados.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { InicioComponent } from './inicio/inicio.component';
import { MisTramitesComponent } from './mis-tramites/mis-tramites.component';
import { ReactiveFormsModule } from '@angular/forms';





const routesAdmin: Routes = [
 
  { path: '', component: InicioComponent },
  { path: 'mistramites', component: MisTramitesComponent },
  { path: 'requisitos', component: RequisitosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'certificados', component: CertificadosComponent }
  //{ path: 'lote', component: LoteComponent },
  //{ path: 'permisos', component: PermisosComponent },
  //{ path: 'bodega', component: BodegaComponent },
  //{ path: 'unidad', component: UnidadCultivoComponent },

];



@NgModule({
  declarations: [CertificadosComponent, RequisitosComponent, InicioComponent, MisTramitesComponent],
  imports: [
    RouterModule.forChild(routesAdmin),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CertificadosComponent, InicioComponent]
})
export class PublicoModule { }
