import { Injectable, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject, Observable } from 'rxjs';

import { RegisterResponseDto } from '../Domain/Responses/registerResponseDto.model';
import { RegisterDto } from '../Domain/Users/registerDto.model';
import { LoginDto } from '../Domain/Users/loginDto.model';
import { LoginResponseDto } from '../Domain/Responses/loginResponseDto.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authChangeSub = new BehaviorSubject<boolean>(false);
  public authChanged = this.authChangeSub.asObservable();
  tokenExpirationTimer: any;

  baseUrl = 'https://localhost:5000/api/Authentication';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}


  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public registerUser = (body: RegisterDto) => {
    return this.http
      .post<RegisterResponseDto>(this.baseUrl + '/' + 'register', body)
      .pipe(catchError(this.handleError));
  };

  public loginUser = (body: LoginDto) => {
    return this.http
      .post<LoginResponseDto>(this.baseUrl + '/' + 'login', body)
      .pipe(catchError(this.handleError));
  };

  logout() {
    this.authChangeSub.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
