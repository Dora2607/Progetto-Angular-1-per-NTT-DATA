import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  canActivate: CanActivateFn;

  constructor(private authService: AuthService, private router: Router) {
    this.canActivate = () => {
      if(this.authService.isLoggedIn()){
        return true;
      }
      this.router.navigate(["login"]);
      return false;
    }
  }
}
