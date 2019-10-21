import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApirestService } from './apirest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logedInvar: boolean;

  constructor(private _apirest: ApirestService) {

  }


  async checktokenImp() { //vrifiar que este logeado reviando que tnefa el vlaor del token y que ese token sea valido
    if (!!localStorage.getItem(this._apirest.token_name))
      try {
        let resp = await this._apirest.checktoken().toPromise();
        if (resp['status'] == 200)
          return true;

      } catch (error) {
        console.log(error);
        return false;
      }
    return false;
  }

  async checktokenImpData() {

    if (!!localStorage.getItem(this._apirest.token_name))
      try {
        let resp = await this._apirest.checktoken().toPromise();
        if (resp['status'] == 200)
          return resp;

      } catch (error) {
        console.log(error);
        return error;
      }
    return false;
  }




}//end class
