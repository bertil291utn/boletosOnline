import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  navItemsVar;
  constructor(private router: Router, private _auth: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }


  async navItems() {
    if (await this._auth.checktokenImp()) {
      let varchecktoken = (await this._auth.checktokenImpData()).data.inicial;
      let rutaActual = varchecktoken == 'A' ? 'admin' : (varchecktoken == 'C' ? 'dashboard' : 'dashboard');
      return [
        {
          displayName: 'Dashboard',
          iconName: 'dashboard',
          enabled: true,
          route: rutaActual
        },
        {
          displayName: 'Personas',
          iconName: 'person',
          enabled: true,
          children: [
            {
              displayName: 'Usuarios',
              enabled: varchecktoken == 'A' ? true : false,
              route: 'registro'

            },
            {
              displayName: 'Conductores',
              enabled: varchecktoken == 'C' ? true : false,
              route: 'registro'

            }]
        }];
    }
  }


  // public closeNav() {
  //   this.appDrawer.close();
  // }

  // public openNav() {
  //   this.appDrawer.open();
  // }
}
