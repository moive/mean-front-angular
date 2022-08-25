import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private url = `http://localhost:5000/auth/login`;

  login(data: any) {
    return this.httpClient.post(this.url, data);
  }
}
