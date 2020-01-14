import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApirestRutasService } from '../services/apirest.service';

@Component({
  selector: 'app-venta-bol',
  templateUrl: './venta-bol.component.html',
  styleUrls: ['./venta-bol.component.css']
})
export class VentaBolComponent implements OnInit {
  ruta;
  asientos = [];
  asientos_vender = [];
  asientos_reservados;


  constructor(private _location: Location, private router: Router, private _apirestRutas: ApirestRutasService) {
    this.enrutamiendoData();
  }

  ngOnInit() {

    this.asientosBus(this.ruta.ASIENTOS_BUS);
    this.get_asientos_reservados(this.ruta.ID_RUTA);
  }


  private asientosBus(asientos: number) {
    //buscar que asientos que se han reservado para bloquear en la vista esos asientos 
    for (let i = 1; i <= asientos; i++) {
      this.asientos.push(i);
    }
  }

  public async get_asientos_reservados(id_ruta: number) {
    this.asientos_reservados = await this._apirestRutas.get_asientos_reservados(id_ruta).toPromise();
    console.log('asientos reserv ', this.asientos_reservados);
    if (this.asientos_reservados != null)
      this.asientos_reservados = this.asientos_reservados.ASIENTOS_RESERVADOS;

  }

  private enrutamiendoData() {
    //en caso de que no tenga valores la variable data va adevolver a la direccion de rutas  

    this.ruta = this.router.getCurrentNavigation().extras.replaceUrl != undefined ? this.router.navigate(['rutas']) : this.router.getCurrentNavigation().extras.state.data;
  }

  public showOptions(event) {
    if (event.checked)
      this.asientos_vender.push(event.source.value);
    else
      this.asientos_vender.splice(this.asientos_vender.indexOf(event.source.value), 1);
    // console.log('evento ', event);
    console.log(this.asientos_vender);
  }

  public backClicked() {
    this._location.back();
  }

  public saveBoleto() {
    console.log('boleto guardado');
  }


}//end component
