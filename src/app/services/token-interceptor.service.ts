import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ApirestService } from './apirest.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authServices = this.injector.get(ApirestService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authServices.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}

