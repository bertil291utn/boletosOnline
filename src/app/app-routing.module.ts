import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CooperativaComponent } from './cooperativa/cooperativa.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './services/auth.guard';
import { AuthadminGuard, AuthCoopGuard } from './services/authadmin.guard';
import { ConductorComponent } from './conductor/conductor.component';
import { CondInactivosComponent } from './cond-inactivos/cond-inactivos.component';
import { BusComponent } from './bus/bus.component';


const routes: Routes = [

  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: '', canActivate: [AuthadminGuard], children: [
          { path: '', redirectTo: '/admin', pathMatch: 'full' },
          { path: 'registro', component: RegistroComponent },
          { path: 'admin', component: AdminComponent }
        ]
      },
      {
        path: '', canActivate: [AuthCoopGuard], children: [
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: CooperativaComponent },
          { path: 'conductor', component: ConductorComponent },
          { path: 'condinactivo', component: CondInactivosComponent },
          { path: 'bus', component: BusComponent },
        ]
      },

    ]
  },
  // { path: '',redirectTo:(r:RedirectToService)=>{return r.redirectTo()}, pathMatch: 'full', },
  // { path: '', redirectTo: '/login', pathMatch: 'full', },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }//when type any pages name

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
