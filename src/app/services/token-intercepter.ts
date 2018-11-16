
import { Injectable, Injector} from '@angular/core';
import {
  HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import { catchError, map} from 'rxjs/operators';



import {AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private inj: Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let auth = this.inj.get(AuthService);
    let router = this.inj.get(Router);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
        Accept: 'application/json'
      }
    });
    return next.handle(request)
    .pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
          if (response.status == 401)
            router.navigate(['/login']);
        }

        return observableThrowError(response);
      })
    );
  }
}