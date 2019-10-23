import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../registro/registro.component';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  private _mainUrl = 'https://wsparking.herokuapp.com/usuarios/';
  // private _mainUrl = 'http://localhost/wsparking/usuarios/';
  token_name = 'TOKEN';//nombre para almacenar en localstorage con jwt token

  constructor(private http: HttpClient) { }



  public deleteUser(username) {
    let usuarioObject =
    {
      "username": username
    };
    return this.http.put(this._mainUrl + 'delete', usuarioObject, { responseType: 'json' });

  }


  getallUsers(): Observable<Usuarios[]> {//raer todos los usuarios registrados
    return this.http.get<Usuarios[]>(this._mainUrl + 'all');
  }

  getUserByUserName(username) {
    return this.http.get(this._mainUrl + `username=id${username}`);
  }

  public updateUser(user) {
    let usuarioObject =
    {
      "username": user.username,
      "tipo_usuario": user.tipo_usuario
    };
    return this.http.put(this._mainUrl + 'update', usuarioObject, { responseType: 'json' });
  }



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

  public getalltipouser() {//conductor,visitante,admin,etc
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
