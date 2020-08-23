import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthSignUpFormData } from '@core/models';
@Injectable({
  providedIn: 'root',
})
export class DdxRegisterDataService {
  public email: string = null;
  public password: string = null;

  constructor() {}

  changeEmail(email: string) {
    this.email = email;
  }

  changePassword(password: string) {
    this.password = password;
  }
}
