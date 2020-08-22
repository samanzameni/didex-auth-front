import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { mustMatch, isStrong } from '@core/util/validators';
import { AuthFormData, AuthEmailValidationData } from '@core/models';
import {
  AuthService,
  DdxRegisterDataService,
  DirectionService,
} from '@core/services';
import { Router } from '@angular/router';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';
import { MatCheckbox } from '@angular/material/checkbox';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddx-signup-credentials',
  templateUrl: './ddx-signup-credentials.component.html',
  styleUrls: ['./ddx-signup-credentials.component.scss'],
})
export class SignupCredentialsComponent extends AuthPageDirective
  implements OnInit, AfterViewInit {
  @ViewChild(MatCheckbox) checkbox: MatCheckbox;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService,
    protected cdRef: ChangeDetectorRef,
    private userDataService: DdxRegisterDataService,
    private directionService: DirectionService
  ) {
    super(formBuilder, renderer, router, authService, cdRef);
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        acceptedTerms: [false, [Validators.requiredTrue]],
        // token: ['', environment.production ? [Validators.required] : []],
      },
      {
        validators: [
          mustMatch('password', 'confirmPassword'),
          isStrong('password'),
        ],
      }
    );
  }

  ngAfterViewInit(): void {
    // super.ngAfterViewInit();
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  get isFormValid(): boolean {
    return this.authForm.valid;
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const { confirmPassword, acceptedTerms, ...formData } = this.authForm.value;

    this.authService
      .requestEmailValidation(formData as AuthEmailValidationData)
      .subscribe(
        (response) => {
          this.setLoadingOff();
          this.userDataService.changeEmail(formData.email);
          this.userDataService.changePassword(formData.password);
          // this.userDataService.changeToken(formData.token);

          this.router.navigateByUrl('signup/phone-verification');
        },
        (errorResponse) => {
          this.setLoadingOff();

          if (errorResponse.status === 400) {
            const errors = errorResponse.error;

            if (errors.Email) {
              this.formErrors.email = errors.Email;
            }
          }
        }
      );

    // this.authService.requestSignUp(formData as AuthFormData).subscribe(
    //   (response) => {
    //     this.setLoadingOff();
    //     this.router.navigateByUrl('/signup/success');
    //   },
    //   (errorResponse) => {
    //     this.setLoadingOff();

    //     if (errorResponse.status === 400) {
    //       const errors = errorResponse.error.errors;

    //       if (errors.email) {
    //         this.formErrors.email = errors.email;
    //       }

    //       if (errors.password) {
    //         this.formErrors.password = errors.password;
    //       }

    //       for (const key of Object.keys(errors)) {
    //         if (!['email', 'password', 'default'].includes(key)) {
    //           alert(`An error occured: There is something wrong with ${key}`);
    //         }
    //       }
    //     }
    //   }
    // );
  }
}
