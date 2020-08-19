import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthSignUpFormData } from '@core/models';
@Injectable({
  providedIn: 'root',
})
export class DdxRegisterDataService {
  public email: string;
  public password: string;
  public token: string;

  constructor() {}

  changeEmail(email: string) {
    this.email = email;
    console.log(email);
  }

  changePassword(password: string) {
    this.password = password;
    console.log(password);
  }

  changeToken(token: string) {
    this.token = token;
  }
}
