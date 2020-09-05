import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WidgetModule } from '@widget/widget.module';
import {
  SignInPageComponent,
  SignUpWrapperComponent,
  SignupCredentialsComponent,
  SignupPhoneVerificationComponent,
  SignupSuccessfulComponent,
  ForgotPasswordPageComponent,
  ResetPasswordPageComponent,
  ActivateEmailPageComponent,
  TwoFactorSigninPageComponent,
  AuthLayoutComponent,
} from '@feature/pages';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LocalePipeModule } from './locale-pipe.module';
import { PhoneVerificationGuard } from '@core/guards/phone-verification.guard';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'signin' },
      {
        path: 'signin',
        component: SignInPageComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
      },
      {
        path: 'signin/two-factor',
        component: TwoFactorSigninPageComponent,
      },
      {
        path: 'signup',
        component: SignUpWrapperComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'credentials' },
          { path: 'credentials', component: SignupCredentialsComponent },
          {
            path: 'phone-verification',
            canActivate: [PhoneVerificationGuard],
            component: SignupPhoneVerificationComponent,
          },
        ],
      },
    ],
  },

  {
    path: 'signup/successful',
    component: SignupSuccessfulComponent,
  },

  {
    path: 'activate-email',
    component: ActivateEmailPageComponent,
  },
];

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpWrapperComponent,
    SignupCredentialsComponent,
    SignupPhoneVerificationComponent,
    SignupSuccessfulComponent,
    ForgotPasswordPageComponent,
    AuthLayoutComponent,

    ResetPasswordPageComponent,
    ActivateEmailPageComponent,
    TwoFactorSigninPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
    LocalePipeModule,
    //
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
