import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError = (error: HttpErrorResponse): any => {
    if (error.status === 404) {
      return this.handleNotFound(error);
    } else if (error.status === 400) {
      return this.handleBadRequest(error);
    } else if (error.status === 401) {
      return this.handleUnauthorized(error);
    } else if (error.status === 403) {
      return this.handleForbidden(error);
    }
  };

  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(['/forbidden'], {
      queryParams: { returnUrl: this.router.url },
    });
    return 'Forbidden';
  };

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  };

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if(this.router.url === '/authentication/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: this.router.url }});
      return error.message;
    }
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/authentication/register'){
      let message = '';
      const values = Object.values(error.error.errors);

      values.map((m: any) => {
         message += m + '<br>';
      })

      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }
}
