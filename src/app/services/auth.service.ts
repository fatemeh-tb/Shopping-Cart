import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';

import { RegisterResponseDto } from '../Domain/Responses/registerResponseDto.model';
import { RegisterDto } from '../Domain/Users/registerDto.model';
import { LoginDto } from '../Domain/Users/loginDto.model';
import { LoginResponseDto } from '../Domain/Responses/loginResponseDto.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  tokenExpirationTimer: any;

  baseUrl = 'https://localhost:5000/api/Authentication';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    return token && !this.jwtHelper.isTokenExpired(token);
  };

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public registerUser = (body: RegisterDto) => {
    return this.http.post<RegisterResponseDto>(
      this.baseUrl + '/' + 'register',
      body
    );
  };

  public loginUser = (body: LoginDto) => {
    return this.http.post<LoginResponseDto>(this.baseUrl + '/' + 'login', body)
  };

  logout() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Administrator';
  };
}
