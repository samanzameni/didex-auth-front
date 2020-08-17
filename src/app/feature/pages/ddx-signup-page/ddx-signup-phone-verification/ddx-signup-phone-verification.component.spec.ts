import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdxSignupPhoneVerificationComponent } from './ddx-signup-phone-verification.component';

describe('DdxSignupPhoneVerificationComponent', () => {
  let component: DdxSignupPhoneVerificationComponent;
  let fixture: ComponentFixture<DdxSignupPhoneVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdxSignupPhoneVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdxSignupPhoneVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
