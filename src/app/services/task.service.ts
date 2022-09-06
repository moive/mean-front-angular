import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.baseUrl;
  private url = `${this.baseUrl}/task/all`;
  private urlDelete = `${this.baseUrl}/task/delete`;

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

  delete(id: string) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient.delete<any>(`${this.urlDelete}/${id}`, {
      headers,
    });
  }

  create(value: string) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient.post<any>(
      `${this.baseUrl}/task/create`,
      { name: value },
      { headers }
    );
  }

  update(id: string, name: string) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient.put<any>(
      `${this.baseUrl}/task/update/${id}`,
      { name },
      { headers }
    );
  }
}
