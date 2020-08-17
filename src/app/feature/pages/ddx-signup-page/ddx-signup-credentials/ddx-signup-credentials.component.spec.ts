import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdxSignupCredentialsComponent } from './ddx-signup-credentials.component';

describe('DdxSignupCredentialsComponent', () => {
  let component: DdxSignupCredentialsComponent;
  let fixture: ComponentFixture<DdxSignupCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdxSignupCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdxSignupCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
