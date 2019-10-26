import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

import { Drivers, Usuarios } from '../interfaces/ObjetosInterface';
import { environment } from 'src/environments/environment';

// const urlCoopMain = 'http://localhost/wsboleto/';
const urlCoopMain = 'https://wsappflota.herokuapp.com/';

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






/****************************apirst para drivers********************************************/
@Injectable({
  providedIn: 'root'
})
export class ApirestConductoresService {

  constructor(private http: HttpClient) { }

  public deleteDriver(id_cond) {
    let usuarioObject =
    {
      "id_cond": id_cond
    };
    return this.http.put(urlCoopMain + 'conductores/delete', usuarioObject, { responseType: 'json' });

  }


  public getallDrivers(): Observable<Drivers[]> {
    return this.http.get<Drivers[]>(urlCoopMain + 'conductores');

    /*getData(): Observable<any> {
    return Observable.create((observer: Observer) => {
        this.http.get(url)
          .pipe(catchError(this.handleError)
          .subscribe(res => {
              // Do my service.ts logic.
              // ...
              observer.next(res)
              observer.complete()
          }, err => observer.error(err))
    })
  }*/
  }

  getUserByUserName(username) {
    return this.http.get(urlCoopMain + `username=id${username}`);
  }

  public updateDriver(driver) {
    let data = new FormData();
    data.append('file', driver.foto);
    data.append('public_id', `driver/${driver.cedula}`);
    data.append('ID_COND', driver.id_cond);
    data.append('CORREO_COND', driver.email);
    data.append('DIRECCION_COND', driver.direccion);
    data.append('TELEFONO_COND', driver.telefono);
    data.append('ESTADO_COND', driver.estado);
    return this.http.post(urlCoopMain + 'conductores/update', data, { responseType: 'json' });
  }

  
  public registerDriver(driver) {
    let data = new FormData();
    data.append('file', driver.foto);
    data.append('public_id', `driver/${driver.cedula}`);
    data.append('ID_EMPRESA', driver.id_empresa);
    data.append('CEDULA_COND', driver.cedula);
    data.append('NOMBRE_COND', driver.nombres);
    data.append('APELLIDO_COND', driver.apellidos);
    data.append('CORREO_COND', driver.email);
    data.append('DIRECCION_COND', driver.direccion);
    data.append('TELEFONO_COND', driver.telefono);
    data.append('ESTADO_COND', driver.estado);
    return this.http.post(urlCoopMain + 'conductores', data, { responseType: 'json' });
  }


}//end class condcutores



/****************************apirst para empresas cooperativas********************************************/
@Injectable({
  providedIn: 'root'
})
export class ApirestEmpresasService {

  constructor(private http: HttpClient) { }

  public getallEmpresas() {
    return this.http.get(urlCoopMain + 'empresa/all');
  }



}//end class empresas