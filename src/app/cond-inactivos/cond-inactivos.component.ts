import { Component, OnInit, Inject } from '@angular/core';
import { ApirestConductoresService } from '../services/apirest.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Drivers } from '../interfaces/ObjetosInterface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cond-inactivos',
  templateUrl: './cond-inactivos.component.html',
  styleUrls: ['./cond-inactivos.component.css']
})
export class CondInactivosComponent implements OnInit {
  dataSource = new UserDataSource(this._apirest);
  //para el encabezado de la tabla
  displayedColumns: string[] = ['numeracion', 'cedula', 'nombres', 'apellidos', 'email', 'direccion', 'telefono', 'opciones'];

  constructor(private _apirest: ApirestConductoresService, public dialog: MatDialog,private _location: Location) { }

  ngOnInit() {
  }


  public activarElem(driver) {
    console.log('user van asi ', driver);
    let componente;
    componente = DialogInactiveDriver;

    const dialogRef = this.dialog.open(componente, {
      width: '300px',
      data: { id_cond: driver.ID_COND, nombre: driver.NOMBRE_COND, apellido: driver.APELLIDO_COND, cedula: driver.CEDULA_COND }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        if (result.value)
          this.refreshTable();
      console.log('The dialog was closed ', result);
    });

  }

  public refreshTable() {
    console.log('refresh table');
    this.dataSource = null;
    this.dataSource = new UserDataSource(this._apirest);
  }

  public backClicked() {
    this._location.back();
  }


}//end class




/***************DATASOURCE CLASS********************/


//class userdatasoyrce
export class UserDataSource extends DataSource<any> {
  handleError;
  constructor(private _apirest: ApirestConductoresService) {
    super();
  }
  connect(): Observable<Drivers[]> {
    return this._apirest.getInactiveDrivers();
  }

  disconnect() { }


}//end class userdata source


/***********componente para eliminar *********************************************/

@Component({
  selector: 'dialog-delete-user',
  template: `
  <div mat-dialog-content>
  <p>Esta seguro de activar este conductor <br>
  <strong>C&eacute;dula: </strong>{{data.cedula}} <br>
  <strong>Nombres: </strong>{{data.nombre}} <br>
  <strong>Apellidos: </strong>{{data.apellido}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="activarDriver()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  `
})
export class DialogInactiveDriver {
  constructor(
    public dialogRef: MatDialogRef<DialogInactiveDriver>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestConductoresService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  activarDriver() {
      this._apirest.updateDriverToActive(this.data.id_cond).subscribe(resp => {
        if (resp['status'] == 200)
          this.dialogRef.close({ value: true });//if response is correct then refresh table 
      },
        err => {
          console.log('err update', err);
          this.dialogRef.close({ value: false });
        }
      );
    console.log('se activo el usuario: ', this.data.id_cond, ' ', this.data.cedula);
  }
}//end dialog suer class

