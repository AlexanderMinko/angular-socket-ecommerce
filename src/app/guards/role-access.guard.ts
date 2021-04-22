import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getAccount()) {
      this.router.navigate(['/'])
      return false;
    }
      const accountRoles: string[] = this.authService.getAccount().roles;
    if (!accountRoles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }

}
