import {
  Component,
  OnInit,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, DirectionService } from '@core/services';
import { AuthFormData } from '@core/models';
import { environment } from '@environments/environment';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'ddx-signin-page',
  templateUrl: './ddx-signin-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signin-page.component.scss',
  ],
})
export class SignInPageComponent
  extends AuthPageDirective
  implements OnInit, AfterViewInit, OnDestroy {
  private paramSubscription: Subscription;
  private redirectURL: string;
  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected cdRef: ChangeDetectorRef,
    private directionService: DirectionService
  ) {
    super(formBuilder, renderer, router, authService, cdRef);
    this.redirectURL = null;
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      token: ['', environment.production ? [Validators.required] : []],
    });

    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      if (params) {
        this.redirectURL = params.from;
      }
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const formData = this.authForm.value;
    this.authService.requestSignIn(formData as AuthFormData).subscribe(
      (response) => {
        this.setLoadingOff();
        if (response.status === 200) {
          if (this.redirectURL && this.redirectURL.length > 0) {
            this.router.navigateByUrl(
              this.router.parseUrl(
                '/external-redirect?redirect_url='.concat(this.redirectURL)
                // '/external-redirect?redirect_url=/trade'
              )
            );
          } else {
            this.handleRedirectionOnSuccess(document.location.hostname);
          }
        } else if (response.status === 202) {
          if (this.redirectURL && this.redirectURL.length > 0) {
            this.router.navigateByUrl(
              this.router.parseUrl(
                '/signin/two-factor?redirect_url='.concat(this.redirectURL)
                // '/signin/two-factor?redirect_url=/trade'
              )
            );
          } else {
            this.router.navigateByUrl('/signin/two-factor');
          }
        }
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.email) {
            this.formErrors.email = errors.email;
          }

          if (errors.password) {
            this.formErrors.password = errors.password;
          }

          for (const key of Object.keys(errors)) {
            if (!['email', 'password'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
