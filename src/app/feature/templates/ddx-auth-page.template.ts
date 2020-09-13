import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Renderer2,
  ViewChild,
  Directive,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { ProButtonComponent } from '@widget/components';

declare var grecaptcha: any;

@Directive()
export abstract class AuthPageDirective implements AfterViewInit {
  protected authForm: FormGroup;
  protected formErrors: any;
  protected isPasswordHidden: boolean;

  @ViewChild('submitButton') submitButton: ProButtonComponent;
  @ViewChild('recaptcha') recaptchaElement: ElementRef;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService,
    protected cdRef: ChangeDetectorRef
  ) {
    this.submitReCaptchaV3 = this.submitReCaptchaV3.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formErrors = {};
    this.isPasswordHidden = true;
  }

  ngAfterViewInit(): void {
    this.addRecaptchaScript();
  }

  get isHidden(): boolean {
    return this.isPasswordHidden;
  }

  public toggleHidePassword(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  protected setLoadingOn(): void {
    this.submitButton.setLoadingOn();
  }

  protected setLoadingOff(): void {
    this.submitButton.setLoadingOff();
  }

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

  get authFormGroup(): FormGroup {
    return this.authForm;
  }

  get authFormControls() {
    return this.authForm.controls;
  }

  get authFormErrors(): any {
    return this.formErrors;
  }

  get isFormValid(): boolean {
    return this.authForm.valid;
  }

  hasNumber(value: string): boolean {
    return /\d/.test(value);
  }
  hasUpper(value: string): boolean {
    return /[A-Z]/.test(value);
  }
  hasLower(value: string): boolean {
    return /[a-z]/.test(value);
  }
  hasSpecial(value: string): boolean {
    return /[-!$%^&*()_+@|~=`{}\[\]:";'<>?,.\/\\]/.test(value);
  }
  isAtLeastEightCharacters(value: string): boolean {
    return value && value.length >= 8;
  }

  setReCaptchaToken(token: string): void {
    this.authForm.controls.token.setValue(token);
    this.cdRef.detectChanges();
  }

  handleRedirectionOnSuccess(hostname: string): void {
    // const url = 'https://' + (environment.production ? '' : 'dev.') + hostname;
    const url = '/trade';
    const link = document.createElement('a');
    link.href = url;
    link.style.width = '1px';
    link.style.height = '1px';
    link.style.position = 'fixed';
    link.style.top = '0';
    link.style.left = '0';
    link.target = '_self';
    document.getElementsByTagName('body')[0].appendChild(link);
    link.click();
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

  abstract onSubmit(token?: string): void;
}
