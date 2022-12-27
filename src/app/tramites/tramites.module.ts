import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RadicadosComponent } from './radicados/radicados.component';


const routesAdmin: Routes = [

  { path: 'radicados', component: RadicadosComponent }
  //{ path: 'usuarios', component: UsuariosComponent },
  //{ path: 'proveedor', component: ProveedorComponent },
  //{ path: 'lote', component: LoteComponent },
  //{ path: 'permisos', component: PermisosComponent },
  //{ path: 'bodega', component: BodegaComponent },
  //{ path: 'unidad', component: UnidadCultivoComponent },

];


@NgModule({
  declarations: [RadicadosComponent],
  imports: [
    RouterModule.forChild(routesAdmin),
    CommonModule,
    FormsModule
  ],
  exports: []
})
export class TramitesModule { }
