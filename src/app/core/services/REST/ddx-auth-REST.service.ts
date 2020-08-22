import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '../ddx-storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthResetPasswordData,
  AuthEmailActivationData,
  AuthEmailValidationData,
} from '@core/models';
import { Observable } from 'rxjs';
import { LocaleService } from '../ddx-locale.service';

@Injectable()
export class AuthRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient,
    protected localeService: LocaleService
  ) {
    super(storageService, http, localeService);
  }

  public requestRegister(data: AuthFormData): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/register`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestSendConfirmationMobileNumber(data: any): Observable<any> {
    return this.httpPOST('api/Account/SendConfirmationMobileNumber', data);
  }

  public requestUpdateMobileNumber(data: any): Observable<any> {
    return this.httpPUT('api/Trader/MobileNumber', data);
  }

  public requestLogin(
    data: AuthFormData
  ): Observable<HttpResponse<AuthFormResponse>> {
    return this.httpPureRequestWithFullResponse(
      `api/Account/login`,
      'POST',
      data
    ) as Observable<HttpResponse<AuthFormResponse>>;
  }

  public requestTwoFactorLogin(
    data: any
  ): Observable<HttpResponse<AuthFormResponse>> {
    return this.httpPureRequestWithFullResponse(
      `api/Account/twoFactorLogin`,
      'POST',
      data
    ) as Observable<HttpResponse<AuthFormResponse>>;
  }

  public requestResetPassword(
    data: AuthResetPasswordFormData
  ): Observable<any> {
    return this.httpPureRequest(
      `api/Account/requestResetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestNewPassword(data: AuthResetPasswordData): Observable<any> {
    return this.httpPureRequest(
      `api/Account/resetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/verifyEmail`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestEmailValidation(options: any): Observable<any> {
    return this.httpGET(`api/Account/validate-email`, options);
  }

  public requestChangePassword(data: any): Observable<any> {
    return this.httpPOST(`api/Account/changePassword`, data) as Observable<any>;
  }
}
