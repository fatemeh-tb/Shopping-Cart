import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  baseUrl = 'https://localhost:5000/api/Authentication';
  constructor(private http: HttpClient) {}

  public getClaims = (route: string) => {
    return this.http.get(this.baseUrl + '/' + 'admin');
  };
}
