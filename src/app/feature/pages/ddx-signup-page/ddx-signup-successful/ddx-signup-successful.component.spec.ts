import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessfulComponent } from './ddx-signup-successful.component';

describe('SignupSuccessfulComponent', () => {
  let component: SignupSuccessfulComponent;
  let fixture: ComponentFixture<SignupSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSuccessfulComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
