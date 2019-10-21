import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  // private _mainUrl = 'https://wsparking.herokuapp.com/usuarios/';
  private _mainUrl = 'http://localhost/wsparking/usuarios/';
  token_name = 'TOKEN';//nombre para almacenar en localstorage con jwt token

  constructor(private http: HttpClient) { }
  registerUser(user) {
    let usarioObject =
    {
      "username": user.username,
      "password": user.password,
      "name": user.name,
      "email": user.email,
      "tipo_usuario": user.tipo_usuario
    };
    return this.http.post(this._mainUrl + 'save', usarioObject, { responseType: 'json' });
  }


  getallparkings() {
    return this.http.get(this._mainUrl + 'parqueaderos');
  }

  login(user) {
    let usarioObject =
    {
      "username": user.username,
      "password": user.password
    };
    return this.http.post(this._mainUrl + 'login', usarioObject, { responseType: 'json' });

  }

  public getalltipouser() {
    return this.http.get(this._mainUrl + 'alltipouser');
  }


  public getToken() {
    return localStorage.getItem(this.token_name)
  }


  public checktoken() {
    let autrizationHeader = new HttpHeaders().set('Authorization', this.getToken());
    return this.http.post(this._mainUrl + 'check_token', null, { headers: autrizationHeader, responseType: 'json' });
  }

}//end class
