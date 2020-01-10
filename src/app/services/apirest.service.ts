import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

import { Drivers, Usuarios, Buses } from '../interfaces/ObjetosInterface';
import { environment } from 'src/environments/environment';
import { Driver } from 'selenium-webdriver/chrome';

const urlCoopMain = 'http://localhost/wsboleto/';
// const urlCoopMain = 'https://wsappflota.herokuapp.com/';

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

  getDriverById(id) {
    return this.http.get(urlCoopMain + `conductores/${id}`);
  }

  getNullDriverId() {
    return this.http.get(urlCoopMain + `conductores/nulldriver`);
  }

  public updateDriver(driver) {
    let data = new FormData();
    if (driver.foto != null) {
      data.append('FILE', driver.foto);
    }
    data.append('ID_COND', driver.id_cond);
    data.append('CORREO_COND', driver.email);
    data.append('DIRECCION_COND', driver.direccion);
    data.append('TELEFONO_COND', driver.telefono);
    data.append('ESTADO_COND', driver.estado);
    return this.http.post(urlCoopMain + 'conductores/update', data, { responseType: 'json' });
  }


  public registerDriver(driver) {
    let data = new FormData();
    if (driver.foto != null) {
      data.append('FILE', driver.foto);
    }

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

  public getInactiveDrivers(): Observable<Drivers[]> {
    return this.http.get<Drivers[]>(urlCoopMain + 'conductores/inactivos');
  }

  public updateDriverToActive(id_cond) {
    let usuarioObject =
    {
      "id_cond": id_cond
    };
    return this.http.put(urlCoopMain + 'conductores/update_inactivos', usuarioObject, { responseType: 'json' });

  }


}//end class condcutores



/****************************apirest para empresas cooperativas********************************************/
@Injectable({
  providedIn: 'root'
})
export class ApirestEmpresasService {

  constructor(private http: HttpClient) { }

  public getallEmpresas() {
    return this.http.get(urlCoopMain + 'empresas');
  }



}//end class empresas


/*****************API REST PARA BUSES***********************************/

@Injectable({
  providedIn: 'root'
})
export class ApirestBusesService {

  constructor(private http: HttpClient) { }

  public deleteBus(id_bus) {
    let usuarioObject = new FormData();
    usuarioObject.append('ID_BUS', id_bus);
    usuarioObject.append('ESTADO_BUS', '0');
    return this.http.post(urlCoopMain + 'buses/setEstado', usuarioObject, { responseType: 'json' });
  }


  public getallBuses(): Observable<Buses[]> {
    return this.http.get<Buses[]>(urlCoopMain + 'buses');
  }

  getUserByUserName(username) {
    return this.http.get(urlCoopMain + `username=id${username}`);
  }

  public updateBus(bus) {

    let data = new FormData();
    data.append('ID_BUS', bus.id_bus);
    data.append('ID_COND', bus.id_cond);
    data.append('NUMERO_BUS', bus.numero_bus);
    data.append('ASIENTOS_BUS', bus.asientos_bus);
    data.append('DOS_PISOS_BUS', bus.dos_pisos_bus);

    return this.http.post(urlCoopMain + 'buses/update', data, { responseType: 'json' });
  }


  public registerBuses(bus) {
    let data = new FormData();
    data.append('ID_COND', bus.id_cond);
    data.append('NUMERO_BUS', bus.numero_bus);
    data.append('ASIENTOS_BUS', bus.asientos_bus);
    data.append('DOS_PISOS_BUS', bus.dos_pisos_bus);

    return this.http.post(urlCoopMain + 'buses', data, { responseType: 'json' });
  }

  public getInactiveBuses(): Observable<Buses[]> {
    return this.http.get<Buses[]>(urlCoopMain + 'buses/inactivos');
  }

  public updateBusToActive(id_bus) {

    let usuarioObject = new FormData();
    usuarioObject.append('ID_BUS', id_bus);
    usuarioObject.append('ESTADO_BUS', '1');

    return this.http.post(urlCoopMain + 'buses/setEstado', usuarioObject, { responseType: 'json' });

  }


}//end class buses