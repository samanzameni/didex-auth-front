import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DdxRegisterDataService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class PhoneVerificationGuard implements CanActivate {
  constructor(
    private userDataService: DdxRegisterDataService,
    private router: Router
  ) {}
  canActivate(): boolean | UrlTree {
    if (this.userDataService.email && this.userDataService.password) {
      return true;
    } else {
      //   alert('Enter your email and password in order to proceed.');
      return this.router.parseUrl('/signup/credentials');
    }
  }
}
