import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthadminGuard implements CanActivate {
  datatoken;

  constructor(private _router: Router, private _auth: AuthenticationService) { }

  async canActivate() {
    this.datatoken = await this.checktokenData();
    if (this.datatoken.data.inicial == 'A')
      return true;
    this.typeuserRouting();
    return false;
  }


  public async checktokenData() {
    return await this._auth.checktokenImpData();
  }

  async typeuserRouting() {
    console.log('datatoken ', this.datatoken);
    switch (this.datatoken.data.inicial) {
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




/****************COOPERAITVA GUARD***************************/

@Injectable({
  providedIn: 'root'
})
export class AuthCoopGuard implements CanActivate {
  datatoken;

  constructor(private _router: Router,private _adminguard:AuthadminGuard) { }

  async canActivate() {
    this.datatoken = await this._adminguard.checktokenData();
    if (this.datatoken.data.inicial == 'C')
      return true;
    this.typeuserRouting();
    return false;
  }


  
  async typeuserRouting() {
    console.log('datatoken ', this.datatoken);
    switch (this.datatoken.data.inicial) {
      case 'A':
        this._router.navigate(['/admin']);
        break;
      // case 'V':
      //   this._router.navigate(['/visitante']);
      //   break;

      // default:
      //   this._router.navigate(['/dashboard']);
      //   break;
    }
  }

}//end class
