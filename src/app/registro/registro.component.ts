import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApirestService } from '../services/apirest.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/ObjetosInterface';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {
  registrodatos = {};
  registerForm;
  tipouser;
  dataSource = new UserDataSource(this._apirest);// sourde para poner en la tabla
  displayedColumns: string[] = ['numeracion', 'username', 'name', 'email', 'tipo_user', 'opciones'];//columnas de tabla
  registroisactive: boolean = false;//para ver/esconder el formulario d eregistro
  hide = true;//para visulizar/hide el password input

  constructor(private _apirest: ApirestService,
    private fb: FormBuilder, public dialog: MatDialog) {
    this.initFormulario();
    //this.initform2();
  }

  private initFormulario() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipo_usuario: new FormControl('', Validators.required),
    });
  }



  ngOnInit() {
    this.getalltipouser();
  }


  openDialog(user, edit: boolean): void {
    console.log('user van asi ', user);
    let componente;
    if (edit)
      componente = DialogOverviewExampleDialog;
    else
      componente = DialogDeleteUser;

    const dialogRef = this.dialog.open(componente, {
      width: '300px',
      data: { username: user.username, tipo_usuario: user.id }
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



  public getalltipouser() {
    //todos los tipos de usuario
    this._apirest.getalltipouser().subscribe(resp => {
      this.tipouser = resp;
    });
  }

  registrarUser() {
    if (this.registerForm.status == 'INVALID')
      return console.log('Revise que haya ingresado todos los datos');
    console.log(this.registerForm);
    this._apirest.registerUser(this.registerForm.value).subscribe(
      resp => {
        console.log(resp);
        this.registerForm.reset();
        this.refreshTable();
        // this._router.navigate(['/login']);
      },
      err => { console.log(err); this.registerForm.reset(); }
    );
  }


}//end class



//class userdatasoyrce
export class UserDataSource extends DataSource<any> {
  constructor(private _apirest: ApirestService) {
    super();
  }
  connect(): Observable<Usuarios[]> {
    return this._apirest.getallUsers();
  }
  disconnect() { }
}


//component dialog to edit

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <form [formGroup]="registerForm">
  <div mat-dialog-content>
  <p>Username: {{data.username}}</p>
    <mat-form-field>
      <mat-label>Elija un rol...</mat-label>
      <mat-select required formControlName="tipo_usuario" required>
        <mat-option [value]="roles.id" *ngFor="let roles of tipouser">{{roles.descripcion|titlecase}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="updateUser()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  </form>
  `
})
export class DialogOverviewExampleDialog {
  tipouser;
  registerForm;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getalltipouser();
    this.initFormulario();
    this.LoadDatatoUpdate();//cargar datos en el dialog
    console.log('opendialog');
  }


  private initFormulario() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      tipo_usuario: new FormControl('', Validators.required)
    });
  }

  public getalltipouser() {
    //todos los tipos de usuario
    this._apirest.getalltipouser().subscribe(resp => {
      this.tipouser = resp;
    });
  }

  private LoadDatatoUpdate() {
    this.registerForm.controls['username'].setValue(this.data.username);
    this.registerForm.controls['tipo_usuario'].setValue(this.data.tipo_usuario);
  }

  public updateUser() {

    console.log('datos para enviar a la BD', this.registerForm.value);
    this._apirest.updateUser(this.registerForm.value).subscribe((resp) => {
      if (resp['status'] == 200)
        this.dialogRef.close({ value: true });//if response is correct then refresh table 
    },
      err => {
        console.log('err update', err);
        this.dialogRef.close({ value: false });
      }
    );
  }




}//end dialog edit class



@Component({
  selector: 'dialog-delete-user',
  template: `
  <div mat-dialog-content>
  <p>Esta seguro de eliminar este usuario {{data.username}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="deleteUser()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  `
})
export class DialogDeleteUser {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this._apirest.deleteUser(this.data.username).subscribe(resp => {
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