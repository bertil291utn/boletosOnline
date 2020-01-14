import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ApirestConductoresService, ApirestEmpresasService, ApirestService, ApirestBusesService } from '../services/apirest.service';
import { Drivers, Buses } from '../interfaces/ObjetosInterface';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  dataSource = new UserDataSource(this._apirest);
  //para el encabezado de la tabla
  displayedColumns: string[] = ['numeracion', 'numero_bus', 'id_cond', 'asientos_bus', 'dos_pisos', 'opciones'];
  //para activar/desactivar el formulario de registro con el botton 
  registroisactive: boolean = false;
  registerForm;
  empresas;//para mostrar el select option de empresas
  conductores;//para mostrar el select option de condcutores
  editButton: boolean = false;

  constructor(private _apirest: ApirestBusesService, public dialog: MatDialog,
    private _apirestEmpresa: ApirestEmpresasService, private _router: Router, private _apirestCond: ApirestConductoresService) { }

  ngOnInit() {
    this.initFormulario();
    this.getAllEmpresas();
    this.getAllDrivers();

  }

  private initFormulario() {
    this.registerForm = new FormGroup({
      id_bus: new FormControl(''),
      // id_empresa: new FormControl('', Validators.required),
      id_cond: new FormControl('', Validators.required),
      numero_bus: new FormControl('', Validators.required),
      asientos_bus: new FormControl('', Validators.required),
      estado_bus: new FormControl(''),
      dos_pisos_bus: new FormControl('')
    });
  }

  public async getAllDrivers() {
    this.conductores = await this._apirestCond.getallDrivers().toPromise();
  }


  openDialog(bus): void {
    console.log('user van asi ', bus);
    let componente;
    componente = DialogDeleteBus;

    const dialogRef = this.dialog.open(componente, {
      width: '300px',
      data: { id_bus: bus.ID_BUS, numero: bus.NUMERO_BUS, conductor: bus.NOMBRE_COND + ' ' + bus.APELLIDO_COND }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        if (result.value)
          this.refreshTable();
      console.log('The dialog was closed ', result);
    });
  }


  public editRetrieveData(elemento) {
    // this.registerForm.controls['value'].setValue(this.value);
    if (elemento !== null || undefined) {
      this.registerForm.controls['id_bus'].setValue(elemento.ID_BUS);
      // this.registerForm.controls['id_empresa'].setValue(elemento.ID_EMPRESA);
      this.registerForm.controls['id_cond'].setValue(+elemento.ID_COND);
      this.registerForm.controls['numero_bus'].setValue(elemento.NUMERO_BUS);
      this.registerForm.controls['asientos_bus'].setValue(elemento.ASIENTOS_BUS);
      this.registerForm.controls['estado_bus'].setValue(elemento.ESTADO_BUS);
      this.registerForm.controls['dos_pisos_bus'].setValue(elemento.DOS_PISOS_BUS);
      console.log('retireve from form: ', this.registerForm.value);
    }
  }

  public cancelarRegistro() {
    if (this.editButton) {//si esta activo se va a editar caso contrario se va a add un condcutor 
      this.registerForm.reset();//reset valores
      this.editButton = false
    } else {
      this.registerForm.reset();//reset valores
    }
    this.registroisactive = false;
  }


  public editElem(elem) {
    //boton del lapiz para llamar a un objeto en especifico,
    //elem ees el objeto a aeditar 
    if (!this.registroisactive)//si el cuadro de registro/edicion esta descatvica no visible se debe mostrar (activo)
      this.registroisactive = true;
    this.editButton = true;
    this.editRetrieveData(elem);//se manda a asignar en el form los datos que se han traido
  }

  //transformar de file to base64
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  // //seleccionar archivo fotografia
  // public async onFileSelected(event) {
  //   this.fotoFile = event.target.files[0];
  //   this.registerForm.controls['foto'].setValue(this.fotoFile);//asigna a la variable fotografia del formualrio el valor de a fotografia
  //   this.previewFoto = await this.toBase64(this.fotoFile);//muestra un preview  ela imgen que se va a subir
  //   console.log('file: ', this.fotoFile);
  // }

  //trer todas las cooperativas
  public async getAllEmpresas() {
    this.empresas = await this._apirestEmpresa.getallEmpresas().toPromise();
    this.empresas = this.empresas[0];
    console.log('this.empresas : ', this.empresas);
  }


  //guardar un buses
  async registrarBus() {
    console.log(this.registerForm.value);
    //revisa que ningun campo este vacio caso contrario devuelve el mensaje
    if (this.registerForm.status == 'INVALID')
      return console.log('Revise que haya ingresado todos los datos');
    if (!this.editButton) {
      //se guarad en la bd el conductor
      this._apirest.registerBuses(this.registerForm.value).subscribe(
        resp => {
          console.log(resp);
          if (resp['status'] == 200) {
            this.registerForm.reset();
            this.refreshTable();
          }
        },
        err => { console.log(err); this.registerForm.reset(); }
      );
    }
    else {
      console.log('form when edit: ', this.registerForm.value);

      this._apirest.updateBus(this.registerForm.value).subscribe(resp => {
        if (resp['status'] == 200) {
          this.registerForm.reset();
          this.refreshTable();
          this.editButton = false
        }
      });
    }
  }//ed register bus

  public refreshTable() {
    console.log('refresh table');
    this.dataSource = null;
    this.dataSource = new UserDataSource(this._apirest);
  }


  public VerInactivos() {
    this._router.navigate(['businactivo']);
  }

}//end conductor component class 





//class userdatasoyrce
export class UserDataSource extends DataSource<any> {
  handleError;
  constructor(private _apirest: ApirestBusesService) {
    super();
  }
  connect(): Observable<Buses[]> {
    return this._apirest.getallBuses();
  }

  disconnect() { }


}//end class userdata source





/***********componente para eliminar *********************************************/

@Component({
  selector: 'dialog-delete-bus',
  template: `
  <div mat-dialog-content>
  <p>Esta seguro de eliminar este bus <br>
  <strong>N&uacute;mero bus: </strong>{{data.numero}} <br>
  <strong>Conductor: </strong>{{data.conductor}} <br>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="deleteBus()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  `
})
export class DialogDeleteBus {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteBus>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestBusesService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBus() {
    this._apirest.deleteBus(this.data.id_bus).subscribe(resp => {
      if (resp['status'] == 200)
        this.dialogRef.close({ value: true });//if response is correct then refresh table 
    },
      err => {
        console.log('err update', err);
        this.dialogRef.close({ value: false });
      }
    );
  }
}//end dialog suer class