import { Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
 } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate , CanActivateChild {
  constructor(private as: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.as.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return false
    }
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.canActivate(childRoute, state)
  }
}
