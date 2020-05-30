import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorSigninPageComponent } from './ddx-two-factor-signin-page.component';

describe('TwoFactorSigninPageComponent', () => {
  let component: TwoFactorSigninPageComponent;
  let fixture: ComponentFixture<TwoFactorSigninPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwoFactorSigninPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorSigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
