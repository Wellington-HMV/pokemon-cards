import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  throwError,
} from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    headers = headers.append('X-Api-Key', environment.API_KEY_TCG);
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', '*');
    headers = headers.append(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    headers = headers.append(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE'
    );

    req = req.clone({
      withCredentials: false,
      headers: headers,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
            return this.handleError(req, next,error.status);
        }
        return throwError(() => error);
      })
    );
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler,status:number) {
    // TODO: send the user to login page if not authenticated
    const errorMessage = `${status}: Backend returned code ${request.url}`;
    console.log(errorMessage);
    return next.handle(request);
  }
}

export const HTTPINTERCEPTORPROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
