import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: any = null;

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;
  private urlLogin = `${this.baseUrl}/auth/login`;
  private urlRegister = `${this.baseUrl}/auth/register`;

  login(data: any) {
    return this.loadApi(this.urlLogin, data);
  }
  register(data: any) {
    return this.loadApi(this.urlRegister, data);
  }

  private loadApi(url: string, data: any) {
    return this.httpClient.post<any>(url, data).pipe(
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

  validateToken(): Observable<boolean> {
    const token = JSON.parse(localStorage.getItem('user')!);

    if (token) {
      return new Observable((subscriber) => {
        subscriber.next(true);
      });
    } else {
      return new Observable((subscriber) => {
        subscriber.next(false);
      });
    }
  }
}
