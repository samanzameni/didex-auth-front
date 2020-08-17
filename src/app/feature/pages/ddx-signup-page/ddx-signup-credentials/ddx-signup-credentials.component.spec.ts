import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCredentialsComponent } from './ddx-signup-credentials.component';

describe('DdxSignupCredentialsComponent', () => {
  let component: SignupCredentialsComponent;
  let fixture: ComponentFixture<SignupCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCredentialsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
