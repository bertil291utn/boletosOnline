import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApirestService } from '../services/apirest.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm;
  constructor(private _apirest: ApirestService, private _router: Router, public _auth: AuthenticationService,
    private _navService: NavService) {

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  async ngOnInit() {
    this._auth.logedInvar = await this._auth.checktokenImp()
    if (this._auth.logedInvar)
      this._router.navigate(['/admin']);
    console.log('this._auth.logedInvar ', this._auth.logedInvar);

  }

  login() {
    if (this.registerForm.status == 'INVALID')
      return console.log('Revise que haya ingresado todos los datos');
    this._apirest.login(this.registerForm.value).subscribe(
      async resp => {
        localStorage.setItem(this._apirest.token_name, resp['token']);
        this._auth.logedInvar = true;
        this._auth.logedInvar = await this._auth.checktokenImpData();
        this.typeuserRouting();
        this._navService.navItemsVar = await this._navService.navItems();
        console.log(resp);
      },
      err => console.log(err));
  }

  async typeuserRouting() {
    let datatoken = await this._auth.checktokenImpData();
    console.log('datatoken ', datatoken);
    switch (datatoken.data.inicial) {
      case 'A':
        this._router.navigate(['/admin']);
        break;
      case 'C':
        this._router.navigate(['/dashboard']);
        break;
      // case 'V':
      //   this._router.navigate(['/visitante']);
      //   break;

      default:
        this._router.navigate(['/dashboard']);
        break;
    }
  }


}//end class
