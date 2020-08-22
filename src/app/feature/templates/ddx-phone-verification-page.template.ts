import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { shouldShowErrors } from '@core/util/forms';
import { ProButtonComponent } from '@widget/components';
import { CONSTANTS } from '@core/util/constants';
import { environment } from '@environments/environment';
import { determineRegion } from '@core/util/region';
import { StorageService } from '@core/services';

@Directive()
export abstract class PhoneVerificationPageDirective {
  public phoneVerification: FormGroup;

  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected storageService: StorageService
  ) {}

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
        determineRegion(this.storageService.getUserAccessToken()) !== '2'
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

  abstract onSubmit(): void;
}
