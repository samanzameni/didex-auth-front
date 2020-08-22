import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { DropdownSelectItem, AuthSignUpFormData } from '@core/models';
import { CONSTANTS, COUNTRIES } from '@core/util/constants';
import { interval, timer, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PhoneVerificationPageDirective } from '@feature/templates';
import { AuthRESTService } from '@core/services/REST';
import { FormBuilder } from '@angular/forms';
import { secondsToTime } from '@core/util/time';
import {
  AuthService,
  DdxRegisterDataService,
  DirectionService,
  StorageService,
} from '@core/services';

@Component({
  selector: 'ddx-signup-phone-verification',
  templateUrl: './ddx-signup-phone-verification.component.html',
  styleUrls: ['./ddx-signup-phone-verification.component.scss'],
})
export class SignupPhoneVerificationComponent
  extends PhoneVerificationPageDirective
  implements OnInit, AfterViewInit {
  private hasSubmittedMobileNumber: boolean;
  private countries: DropdownSelectItem[];
  public countdownTimer: string;
  public timerFinished: boolean = true;

  @ViewChild('submitNumberButton')
  submitNumberButton: any;

  public userRegistrationData: AuthSignUpFormData;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected storageService: StorageService,
    protected cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private restService: AuthRESTService,
    private userDataService: DdxRegisterDataService,
    private directionService: DirectionService
  ) {
    super(router, el, renderer, formBuilder, storageService, cdRef);
    this.renderer.addClass(this.el.nativeElement, 'phone-verification-form');
    this.hasSubmittedMobileNumber = false;
    this.countries = COUNTRIES.map((country) => {
      return {
        title: `${country.emoji} ${country.name}`,
        value: country.phoneCode,
      };
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  get countriesList(): DropdownSelectItem[] {
    return this.countries;
  }

  get hasSubmittedNumber(): boolean {
    return this.hasSubmittedMobileNumber;
  }

  get errors(): any {
    return this.formErrors || {};
  }

  codeStartsWithDigit(value: string): boolean {
    return !!value.match(/^\d/);
  }

  startCountdown(): void {
    this.timerFinished = false;
    const timerInterval$ = interval(1000); //1s
    const timer$ = timer(120000); //120s
    const times = 120;
    const countDown$ = timerInterval$.pipe(take(times));
    const sub = countDown$.subscribe((val) => {
      this.countdownTimer = secondsToTime(times - (val + 1));
    });
    const sub1 = timer$.subscribe((val) => {
      this.timerFinished = true;
    });
  }

  onSubmitNumber(): void {
    this.startCountdown();
    const numbetButton =
      this.submitNumberButton.nativeElement ||
      this.submitNumberButton._elementRef.nativeElement;
    this.renderer.addClass(numbetButton, 'is-loading');
    const { code, ...dataToSend } = this.phoneVerification.value;
    this.restService.requestSendConfirmationMobileNumber(dataToSend).subscribe(
      (response) => {
        this.renderer.removeClass(numbetButton, 'is-loading');
        this.hasSubmittedMobileNumber = true;
      },
      (errorResponse) => {
        this.renderer.removeClass(numbetButton, 'is-loading');
      }
    );
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};
    const dataToSend: AuthSignUpFormData = this.phoneVerification.value;
    dataToSend.email = this.userDataService.email;
    dataToSend.password = this.userDataService.password;
    // dataToSend.token = this.userDataService.token;

    this.authService.requestSignUp(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff();
        this.router.navigateByUrl('/signup/successful');
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;
          if (errors.Code) {
            this.formErrors.code = errors.Code;
          }
          if (errors.Email) {
            this.formErrors.email = errors.Email;
          }
          if (errors.Password) {
            this.formErrors.password = errors.Password;
          }
        }
      }
    );
  }
}
