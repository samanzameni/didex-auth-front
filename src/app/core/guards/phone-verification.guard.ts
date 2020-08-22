import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
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
  canActivate() {
    if (this.userDataService.email && this.userDataService.password) {
      return true;
    } else {
    }
  }
}
