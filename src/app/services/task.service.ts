import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.baseUrl;
  private url = `${this.baseUrl}/task/all`;

  private _user = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }

  constructor(private httpClient: HttpClient) {}

  all() {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient.get<any>(this.url, { headers });
  }
}
