import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ApirestBusesService } from '../services/apirest.service';
import { Buses } from '../interfaces/ObjetosInterface';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-bus-inactivos',
  templateUrl: './bus-inactivos.component.html',
  styleUrls: ['./bus-inactivos.component.css']
})
export class BusInactivosComponent implements OnInit {

  dataSource = new UserDataSource(this._apirest);
  //para el encabezado de la tabla
  displayedColumns: string[] = ['numeracion', 'numero_bus', 'id_cond', 'asientos_bus', 'dos_pisos', 'opciones'];
  
  constructor(private _apirest: ApirestBusesService,public dialog: MatDialog) { }

  ngOnInit() {
  }

  public activarElem(bus) {
    console.log('user van asi ', bus);
    let componente;
    componente = DialogInactiveBus;

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

  public refreshTable() {
    console.log('refresh table');
    this.dataSource = null;
    this.dataSource = new UserDataSource(this._apirest);
  }

}//end bus inactivos componennt


//class userdatasoyrce
export class UserDataSource extends DataSource<any> {
  handleError;
  constructor(private _apirest: ApirestBusesService) {
    super();
  }
  connect(): Observable<Buses[]> {
    return this._apirest.getInactiveBuses();
  }

  disconnect() { }


}//end class userdata source



/***********componente para eliminar *********************************************/

@Component({
  selector: 'dialog-inactive-bus',
  template: `
  <div mat-dialog-content>
  <p>Esta seguro de activar este bus <br>
  <strong>N&uacute;mero bus: </strong>{{data.numero}} <br>
  <strong>Conductor: </strong>{{data.conductor}} <br>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="activarBus()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  `
})
export class DialogInactiveBus {
  constructor(
    public dialogRef: MatDialogRef<DialogInactiveBus>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestBusesService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  activarBus() {
      this._apirest.updateBusToActive(this.data.id_bus).subscribe(resp => {
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

