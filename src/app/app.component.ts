import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ApirestService } from './services/apirest.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boletosOnline';


  constructor(private _auth: AuthenticationService, private _apirest: ApirestService, private _route: Router,
    private _location: Location) {
    this.getlogin();
  }


  public async logout() {
    localStorage.removeItem(this._apirest.token_name);
    this._location.back();
    this._route.navigate(['/login']);
    this._auth.logedInvar = await this._auth.checktokenImp();

  }
  public async getlogin() {
    this._auth.logedInvar = await this._auth.checktokenImp();
    console.log('_auth.logedIn() is : ', this._auth.logedInvar);

    // .then(resp => {
    //   console.log('_auth.logedIn() is : ', resp);
    // })
  }
}
