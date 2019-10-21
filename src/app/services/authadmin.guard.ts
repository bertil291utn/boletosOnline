import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthadminGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthenticationService) { }

  async canActivate() {
    let datatoken = await this._auth.checktokenImpData();
    if (datatoken.data.inicial == 'A')
      return true;
    this.typeuserRouting();
    return false;
  }




  async typeuserRouting() {
    let datatoken = await this._auth.checktokenImpData();
    console.log('datatoken ', datatoken);
    switch (datatoken.data.inicial) {
      case 'C':
        this._router.navigate(['/dashboard']);
        break;
      // case 'V':
      //   this._router.navigate(['/visitante']);
      //   break;

      default:
        this._router.navigate(['/dashboard']);
        break;
    }
  }

}//end class
