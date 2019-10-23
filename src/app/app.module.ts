import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CooperativaComponent } from './cooperativa/cooperativa.component';
import { RegistroComponent, DialogOverviewExampleDialog, DialogDeleteUser } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ApirestService } from './services/apirest.service';
import { AuthadminGuard } from './services/authadmin.guard';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { NavService } from './services/nav.service';
import { CdkColumnDef } from '@angular/cdk/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CooperativaComponent,
    RegistroComponent,
    MenuListItemComponent,
    DialogOverviewExampleDialog,
    DialogDeleteUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuard, ApirestService, AuthadminGuard,NavService,CdkColumnDef
    //   , {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogDeleteUser
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
