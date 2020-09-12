import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import {
  ViewChild,
  ElementRef,
  Renderer2,
  Directive,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { shouldShowErrors } from '@core/util/forms';
import { ProButtonComponent } from '@widget/components';
import { CONSTANTS } from '@core/util/constants';
import { environment } from '@environments/environment';
import { determineRegion } from '@core/util/region';
import { StorageService } from '@core/services';

declare var grecaptcha: any;

@Directive()
export abstract class PhoneVerificationPageDirective
  implements OnInit, AfterViewInit {
  public phoneVerification: FormGroup;
  public formErrors: any;

  @ViewChild('submitButton') submitButton: ProButtonComponent;
  @ViewChild('recaptcha') recaptchaElement: ElementRef;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected storageService: StorageService,
    protected cdRef: ChangeDetectorRef
  ) {
    this.formErrors = {};
    this.submitReCaptchaV3 = this.submitReCaptchaV3.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  ngOnInit() {
    this.phoneVerification = this.formBuilder.group({
      countryTelephoneCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern('[0-9]*'),
        ],
      ],
      mobileNumber: [
        '',
        determineRegion(this.storageService.getUserAccessToken()) === '2'
          ? [Validators.required, Validators.pattern(/^9[0-9]{9}$/)]
          : [
              Validators.required,
              Validators.maxLength(15),
              Validators.pattern('[0-9]*'),
            ],
      ],
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
          Validators.maxLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
          Validators.pattern('[0-9]*'),
        ],
      ],
      token: ['', environment.production ? [Validators.required] : []],
    });
  }

  ngAfterViewInit(): void {
    this.addRecaptchaScript();
  }

  public shouldShowErrors(control: AbstractControl): boolean {
    return shouldShowErrors(control);
  }

  protected setLoadingOn(): void {
    this.submitButton.setLoadingOn();
  }

  protected setLoadingOff(): void {
    this.submitButton.setLoadingOff();
  }

  get phoneVerificationFormGroup(): FormGroup {
    return this.phoneVerification;
  }

  get phoneVerificationFormControls() {
    return this.phoneVerification.controls;
  }

  get isFormValid(): boolean {
    return this.phoneVerification.valid;
  }

  getKeys(object: any): string[] {
    return object ? Object.keys(object) : [];
  }

  get phoneVerificationFormErrors(): any {
    return this.formErrors;
  }

  abstract onSubmit(token?: string): void;

  protected addRecaptchaScript() {
    ((id, obj) => {
      let scriptTag;
      const formerScripts = document.getElementsByTagName('script')[0];

      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.onload = this.renderReCaptcha.bind(this);
      scriptTag.src =
        'https://www.google.com/recaptcha/api.js?render=6LcgguIUAAAAAE1GXYfJd7z-uEah67Dd9kTgWcpz';
      scriptTag.async = true;
      formerScripts.parentNode.insertBefore(scriptTag, formerScripts);
    })('recaptchaV3', this);
  }

  renderReCaptcha() {
    console.log('=== reCAPTCHAv3 loaded');
  }

  setReCaptchaToken(token: string): void {
    this.phoneVerification.controls.token.setValue(token);
    this.cdRef.detectChanges();
  }

  submitReCaptchaV3(): void {
    grecaptcha.ready(() => {
      grecaptcha
        .execute('6LcgguIUAAAAAE1GXYfJd7z-uEah67Dd9kTgWcpz', {
          action: 'submit',
        })
        .then((token) => {
          console.log('=== reCAPTCHA submitted ...');
          this.onSubmit(token);
        });
    });
  }
}
