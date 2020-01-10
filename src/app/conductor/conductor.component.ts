import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ApirestConductoresService, ApirestEmpresasService, ApirestService } from '../services/apirest.service';
import { Drivers } from '../interfaces/ObjetosInterface';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  dataSource = new UserDataSource(this._apirest);
  //para el encabezado de la tabla
  displayedColumns: string[] = ['numeracion', 'cedula', 'nombres', 'apellidos', 'email', 'direccion', 'telefono', 'opciones'];
  //para activar/desactivar el formulario de registro con el botton 
  registroisactive: boolean = false;
  registerForm;
  empresas;//para mostrar el select option de empresas
  previewFoto; //prewview foto de condcutor before save
  fotoFile;//para mostrar dentro de la clase
  editButton: boolean = false;

  constructor(private _apirest: ApirestConductoresService, public dialog: MatDialog,
    private _apirestEmpresa: ApirestEmpresasService, private _router: Router) { }

  ngOnInit() {
    this.initFormulario();
    this.getAllEmpresas();

  }

  private initFormulario() {
    this.registerForm = new FormGroup({
      id_cond: new FormControl(''),
      // id_empresa: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      foto: new FormControl(''),
      email: new FormControl('', Validators.email),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      estado: new FormControl('1'),
    });
  }


  openDialog(driver): void {
    console.log('user van asi ', driver);
    let componente;
    componente = DialogDeleteDriver;

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


  public async editRetrieveData(elemento) {
    // this.registerForm.controls['value'].setValue(this.value);
    if (elemento !== null || undefined) {
      this.registerForm.controls['id_cond'].setValue(elemento.ID_COND);
      // this.registerForm.controls['id_empresa'].setValue(elemento.ID_EMPRESA);
      this.registerForm.controls['cedula'].setValue(elemento.CEDULA_COND);
      this.registerForm.controls['nombres'].setValue(elemento.NOMBRE_COND);
      this.registerForm.controls['apellidos'].setValue(elemento.APELLIDO_COND);
      this.registerForm.controls['foto'].setValue(null);
      this.registerForm.controls['email'].setValue(elemento.CORREO_COND);
      this.registerForm.controls['direccion'].setValue(elemento.DIRECCION_COND);
      this.registerForm.controls['telefono'].setValue(elemento.TELEFONO_COND);
      this.registerForm.controls['estado'].setValue(elemento.ESTADO_COND);
      // this.previewFoto = this.registerForm.get('foto').value;
      let nulldriveridimg = await this._apirest.getNullDriverId().toPromise();//null driver id 16
      nulldriveridimg = nulldriveridimg['nulldriverid'];
      this.previewFoto = elemento.ID_IMG == nulldriveridimg ? null : elemento.FOTO_COND;//si el id_img es 16 poner null par disciminr de una foto nula y otra no nula para poner el estilo ngStyle en la vista
      console.log('null driver id img ', nulldriveridimg);
      console.log('previrefoto ', this.previewFoto);
     
    }
  }

  public cancelarRegistro() {
    if (this.editButton) {//si esta activo se va a editar caso contrario se va a add un condcutor 
      this.registerForm.reset();//reset valores
      this.previewFoto = null;
      console.log('previrefoto ', this.previewFoto);
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
    console.log('elem: ', elem);
  }

  //transformar de file to base64
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  //seleccionar archivo fotografia
  public async onFileSelected(event) {
    this.fotoFile = event.target.files[0];
    this.registerForm.controls['foto'].setValue(this.fotoFile);//asigna a la variable fotografia del formualrio el valor de a fotografia
    this.previewFoto = await this.toBase64(this.fotoFile);//muestra un preview  ela imgen que se va a subir
    console.log('previrefoto ', this.previewFoto);
    console.log('file: ', this.fotoFile);
  }

  //trer todas las cooperativas
  public async getAllEmpresas() {
    this.empresas = await this._apirestEmpresa.getallEmpresas().toPromise();
    this.empresas = this.empresas[0];
    console.log('this.empresas : ', this.empresas);
  }


  //guardar un condcutor
  async registrarDriver() {
    console.log(this.registerForm.value);
    //revisa que ningun campo este vacio caso contrario devuelve el mensaje
    if (this.registerForm.status == 'INVALID')
      return console.log('Revise que haya ingresado todos los datos');
    if (!this.editButton) {
      //se guarad en la bd el conductor
      this._apirest.registerDriver(this.registerForm.value).subscribe(
        resp => {
          console.log(resp);
          if (resp['status'] == 200) {
            this.registerForm.reset();
            this.refreshTable();
            this.fotoFile = null;
            this.previewFoto = null;
            console.log('previrefoto ', this.previewFoto);
          }
        },
        err => { console.log(err); this.registerForm.reset(); }
      );
    } else {
      console.log('form when edit: ', this.registerForm.value);

      this._apirest.updateDriver(this.registerForm.value).subscribe(resp => {
        if (resp['status'] == 200) {
          this.registerForm.reset();
          this.refreshTable();
          this.fotoFile = null;
          this.previewFoto = null;
          console.log('previrefoto ', this.previewFoto);
        }
      });
    }
  }

  public refreshTable() {
    console.log('refresh table');
    this.dataSource = null;
    this.dataSource = new UserDataSource(this._apirest);
  }


  public VerInactivos() {
    this._router.navigate(['condinactivo']);
  }

}//end conductor component class 


//class userdatasoyrce
export class UserDataSource extends DataSource<any> {
  handleError;
  constructor(private _apirest: ApirestConductoresService) {
    super();
  }
  connect(): Observable<Drivers[]> {
    return this._apirest.getallDrivers();
  }



  disconnect() { }


}//end class userdata source





/***********componente para eliminar *********************************************/

@Component({
  selector: 'dialog-delete-user',
  template: `
  <div mat-dialog-content>
  <p>Esta seguro de eliminar este conductor <br>
  <strong>C&eacute;dula: </strong>{{data.cedula}} <br>
  <strong>Nombres: </strong>{{data.nombre}} <br>
  <strong>Apellidos: </strong>{{data.apellido}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="deleteDriver()">Aceptar</button>
    <button mat-button (click)="onNoClick()">Cancelar</button>
  </div>
  `
})
export class DialogDeleteDriver {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteDriver>,
    @Inject(MAT_DIALOG_DATA) public data, private _apirest: ApirestConductoresService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDriver() {
    this._apirest.deleteDriver(this.data.id_cond).subscribe(resp => {
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