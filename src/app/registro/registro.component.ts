import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApirestService } from '../services/apirest.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registrodatos = {};
  registerForm;
  tipouser;

  constructor(private _auth: AuthenticationService, private _router: Router, private _apirest: ApirestService) {
    this.initFormulario();
  }

  private initFormulario() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl(''),
      email: new FormControl('', Validators.required),
      tipo_usuario: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getalltipouser();
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
    // console.log(this.registerForm.value);
    this._apirest.registerUser(this.registerForm.value).subscribe(
      resp => {
        console.log(resp);
        this.registerForm.reset();
        this._router.navigate(['/login']);
      },
      err => { console.log(err); this.registerForm.reset(); }
    );
  }






}//end class
