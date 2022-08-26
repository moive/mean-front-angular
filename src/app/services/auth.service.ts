import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: any = null;

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}

  private url = `http://localhost:5000/auth/login`;

  login(data: any) {
    return this.httpClient.post<any>(this.url, data).pipe(
      tap((res) => {
        if (res.ok) {
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token,
          };
        } else {
          this._user = null;
        }
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
