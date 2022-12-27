import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramitesModule } from './tramites/tramites.module';
import { PublicoModule } from './publico/publico.module';
import { AdministracionModule } from './administracion/administracion.module';

const routes: Routes = [
  
  { path: '', redirectTo: '', pathMatch: 'full' },
  //{ path: 'publico', loadChildren: './publico/publico.module#PublicoModule' },
  //{ path: 'administracion', loadChildren: './administracion/administracion.module#AdministracionModule' },
  //{ path: 'tramites', loadChildren: './tramites/tramites.module#TramitesModule' },
  { path: 'publico', component: PublicoModule },
  { path: 'administracion', component: AdministracionModule},
  { path: 'tramites', component: TramitesModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
