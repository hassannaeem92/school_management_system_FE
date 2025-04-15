import { LoginServiceService } from './../authentication/authentication-service/login-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication/authentication-service/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationServiceService,
    private loginService: LoginServiceService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  

  checkLogin(url: String) {
    
    if (this.loginService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['login']);
      return false
    }

  }

}
