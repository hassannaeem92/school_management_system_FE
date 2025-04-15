import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication/authentication-service/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationServiceService
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (await this.authService.validateSession()) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }

}
