import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ApirestService } from './services/apirest.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from './nav-item';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boletosOnline';
  navItemsVar: NavItem[];

  constructor(public _auth: AuthenticationService, private _apirest: ApirestService, private _route: Router,
    private _location: Location, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public _navService: NavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getlogin();
  }
  ngOnInit() {
    this.navitemsimp();
  }

  private async navitemsimp() {
    this._navService.navItemsVar= await this._navService.navItems();
    console.log('this.navItemsVar ', this._navService.navItemsVar);
  }

  public async logout() {
    localStorage.removeItem(this._apirest.token_name);
    this._location.back();
    this._route.navigate(['/login']);
    this._auth.logedInvar = await this._auth.checktokenImp();

  }
  public async getlogin() {
    this._auth.logedInvar = await this._auth.checktokenImp();
    console.log('_auth.logedIn() is : ', this._auth.logedInvar);

    // .then(resp => {
    //   console.log('_auth.logedIn() is : ', resp);
    // })
  }


  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




}//end class
