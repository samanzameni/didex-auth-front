import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWrapperComponent } from './ddx-signup-wrapper.component';

describe('DdxSignupPageComponent', () => {
  let component: SignUpWrapperComponent;
  let fixture: ComponentFixture<SignUpWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
