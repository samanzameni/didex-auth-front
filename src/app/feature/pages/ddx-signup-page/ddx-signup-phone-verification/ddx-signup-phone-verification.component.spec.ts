import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPhoneVerificationComponent } from './ddx-signup-phone-verification.component';

describe('SignupPhoneVerificationComponent', () => {
  let component: SignupPhoneVerificationComponent;
  let fixture: ComponentFixture<SignupPhoneVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPhoneVerificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPhoneVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
