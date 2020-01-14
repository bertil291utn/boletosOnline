import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApirestRutasService, ApirestBusesService } from '../services/apirest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Rutas } from '../interfaces/ObjetosInterface';


@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {

  registerForm;
  buses;
  ciudades;
  horarios;
  dataSource = new UserDataSource(this._apirestRutas);
  displayedColumns: string[] = ['numeracion','id_ruta', 'nombre_empresa', 'ruta', 'nombre_chofer', 'numero_bus', 'hora_salida', 'costo_salida', 'opciones'];
  registroisactive: boolean = false;
  editButton: boolean = false;

  constructor(public dialog: MatDialog,
    private _apirestRutas: ApirestRutasService, private _apirestBus: ApirestBusesService, private _router: Router) { }

  ngOnInit() {
    this.initFormulario();
    this.getAllBuses();
    this.getAllSelect();//ciudades y horarios
  }

  private initFormulario() {
    this.registerForm = new FormGroup({
      id_ruta: new FormControl(''),
      id_bus: new FormControl('', Validators.required),
      id_img: new FormControl(''),
      id_ciudad_origen: new FormControl('', Validators.required),
      id_ciudad_destino: new FormControl('', Validators.required),
      id_horario: new FormControl('', Validators.required),
      costo: new FormControl('', Validators.required),
      tiempo_est_ruta: new FormControl('')
    });
  }


  public async getAllSelect() {

    this.ciudades = await this._apirestRutas.getallCiudades().toPromise();
    this.horarios = await this._apirestRutas.getallHorarios().toPromise();
  }


  public async getAllBuses() {
    this.buses = await this._apirestBus.getallBuses_().toPromise();
  }

  public async registrarRuta() {
    console.log(this.registerForm.value);
    //revisa que ningun campo este vacio caso contrario devuelve el mensaje
    if (this.registerForm.status == 'INVALID')
      return console.log('Revise que haya ingresado todos los datos');
    if (!this.editButton) {
      this.registerForm.get('tiempo_est_ruta').setValidators([Validators.required]);//is required if some check is activated
      this.registerForm.get('tiempo_est_ruta').updateValueAndValidity();
      //se guarad en la bd el conductor
      this._apirestRutas.registerRutas(this.registerForm.value).subscribe(
        resp => {
          console.log(resp);
          if (resp['status'] == 200) {
            this.registerForm.reset();
            this.refreshTable();

          }
        },
        err => { console.log(err); this.registerForm.reset(); }
      );
    } else {
      console.log('form when edit: ', this.registerForm.value);
      this._apirestRutas.updateRuta(this.registerForm.value).subscribe(resp => {
        if (resp['status'] == 200) {
          this.registerForm.reset();
          this.refreshTable();
          this.editButton = false
        }
      });
    }
  }


  public cancelarRegistro() {
    if (this.editButton) {//si esta activo se va a editar caso contrario se va a add un condcutor 
      this.registerForm.reset();//reset valores
      this.editButton = false
    } else
      this.registerForm.reset();//reset valores
    this.registroisactive = false;
  }


  public editElem(elem) {
    //boton del lapiz para llamar a un objeto en especifico,
    //elem ees el objeto a aeditar 
    if (!this.registroisactive)//si el cuadro de registro/edicion esta descatvica no visible se debe mostrar (activo)
      this.registroisactive = true;
    this.editButton = true;
    this.editRetrieveData(elem);//se manda a asignar en el form los datos que se han traido
    console.log('elem: ', elem);
  }

  public async editRetrieveData(elemento) {
    // this.registerForm.controls['value'].setValue(this.value);
    this.registerForm.get('tiempo_est_ruta').clearValidators();
    this.registerForm.get('tiempo_est_ruta').updateValueAndValidity();
    if (elemento !== null || undefined) {
      this.registerForm.controls['id_ruta'].setValue(elemento.ID_RUTA);
      this.registerForm.controls['id_bus'].setValue(elemento.ID_BUS);
      this.registerForm.controls['id_ciudad_origen'].setValue(elemento.ID_CIUDAD_INICIO);
      this.registerForm.controls['id_ciudad_destino'].setValue(elemento.ID_CIUDAD_DESTINO);
      this.registerForm.controls['id_horario'].setValue(elemento.ID_HORARIO);
      this.registerForm.controls['costo'].setValue(elemento.COSTO_RUTA);
      // this.registerForm.controls['tiempo_est_ruta'].setValue(elemento.ID_RUTA);

    }
  }

  public refreshTable() {
    console.log('refresh table');
    this.dataSource = null;
    this.dataSource = new UserDataSource(this._apirestRutas);
  }

  public ventaBoleto(elem) {
    console.log('venta de boletos');
    this._router.navigate(['boletos'], { state: { data: elem } });

  }


}//end class



export class UserDataSource extends DataSource<any> {
  handleError;
  constructor(private _apirest: ApirestRutasService) {
    super();
  }
  connect(): Observable<Rutas[]> {
    return this._apirest.getallRutas();
  }
  disconnect() { }

}//end class userdata source