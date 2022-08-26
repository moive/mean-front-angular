import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
