import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AuthPageDirective } from '@feature/templates';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ddx-two-factor-signin-page',
  templateUrl: './ddx-two-factor-signin-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-two-factor-signin-page.component.scss',
  ],
})
export class TwoFactorSigninPageComponent extends AuthPageDirective
  implements OnInit, AfterViewInit, OnDestroy {
  private paramSubscription: Subscription;
  private redirectURL: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected authService: AuthService,
    protected router: Router,
    protected cdRef: ChangeDetectorRef
  ) {
    super(formBuilder, renderer, router, authService, cdRef);
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      code: ['', Validators.required],
    });

    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      if (params) {
        this.redirectURL = params.from;
      }
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const formData = Object.assign(
      { rememberMachine: false },
      this.authForm.value
    );

    this.authService.requestTwoFactorSignIn(formData).subscribe(
      (response) => {
        this.setLoadingOff();

        if (this.redirectURL && this.redirectURL.length > 0) {
          this.router.navigateByUrl(
            this.router.parseUrl(
              '/external-redirect?redirect_url='.concat(this.redirectURL)
            )
          );
        } else {
          this.handleRedirectionOnSuccess(document.location.hostname);
        }
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.code) {
            this.formErrors.code = errors.code;
          }

          if (errors.default) {
            this.formErrors.default = errors.default;
          }

          for (const key of Object.keys(errors)) {
            if (!['code', 'default'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
