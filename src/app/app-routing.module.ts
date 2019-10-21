import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CooperativaComponent } from './cooperativa/cooperativa.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './services/auth.guard';
import { AuthadminGuard } from './services/authadmin.guard';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full', },
  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: '', canActivate: [AuthadminGuard], children: [
          { path: 'registro', component: RegistroComponent },
          { path: 'admin', component: AdminComponent }
        ]
      },
      { path: 'dashboard', component: CooperativaComponent }

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }//when type any pages name

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
