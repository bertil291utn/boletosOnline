import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ApirestService } from './apirest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthenticationService) { }


  async canActivate() {
    if (await this._auth.checktokenImp())
      return true;
    else {
      this._router.navigate(['login']);
      return false;
    }

    // try {
    //   let resp = await this._apirest.checktoken().toPromise();
    //   if (resp['status'] == 200)
    //     return true;
    // } catch (error) {
    //   this._router.navigate(['login']);
    //   return false;
    // }
  }



}//end class
