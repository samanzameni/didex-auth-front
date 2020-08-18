import { Injectable } from '@angular/core';
import { AuthRESTService } from './REST';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthEmailActivationData,
  AuthResetPasswordData,
  AuthEmailValidationData,
} from '@core/models';
import { StorageService } from './ddx-storage.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  private isUserAuthorized: boolean;

  constructor(
    private restService: AuthRESTService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.isUserAuthorized = !!this.storageService.getUserAccessToken();
  }

  get isAuthorized(): boolean {
    return this.isUserAuthorized;
  }

  get decodedToken(): any {
    return this.isUserAuthorized
      ? jwtDecode(this.storageService.getUserAccessToken())
      : {};
  }

  public requestSignUp(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestRegister(formData);
  }

  public requestNewPassword(formData: AuthResetPasswordData): Observable<any> {
    return this.restService.requestNewPassword(formData);
  }

  public requestSignIn(
    formData: AuthFormData
  ): Observable<HttpResponse<AuthFormResponse>> {
    return this.restService.requestLogin(formData).pipe(
      tap((response) => {
        if (response.status === 200) {
          this.storageService.setUserAccessToken({
            didexAccessToken: response.body.token,
          });
          this.isUserAuthorized = true;
        }
      })
    );
  }

  public requestTwoFactorSignIn(formData: any): Observable<any> {
    return this.restService.requestTwoFactorLogin(formData).pipe(
      map((response) => response.body),
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.restService.requestVerifyEmail(data).pipe(
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestEmailValidation(
    data: AuthEmailValidationData
  ): Observable<any> {
    data.email = data.email.trim();
    const options = data.email
      ? { params: new HttpParams().set('Email', data.email) }
      : {};
    return this.restService.requestEmailValidation().pipe(
      tap((response) => {
        if (response.status === 204) {
          this.router.navigateByUrl('signup/phone-verification');
        }
      })
    );
  }

  public requestResetPassword(
    formData: AuthResetPasswordFormData
  ): Observable<any> {
    return this.restService.requestResetPassword(formData);
  }

  public requestSignOut(): void {
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.router.navigateByUrl('/');
  }

  public handleAuthError(): void {
    alert(
      'Your token is expired or is not valid. You will get redirected to the sign in page.'
    );
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.router.navigateByUrl('/signin');
  }
}
