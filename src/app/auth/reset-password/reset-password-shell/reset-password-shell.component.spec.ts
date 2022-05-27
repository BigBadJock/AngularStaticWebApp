import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ResetPasswordShellComponent } from './reset-password-shell.component';
import { ResetPasswordDisplayComponent } from '../reset-password-display/reset-password-display.component';
import { getPasswordResetSuccess, getError } from '../../store/auth.selectors';
import { ResetPasswordCredentials } from '../../models/resetPasswordCredentials.model';
import { ResetPassword } from '../../store/auth.actions';

describe('ResetPasswordShellComponent', () => {
  let component: ResetPasswordShellComponent;
  let fixture: ComponentFixture<ResetPasswordShellComponent>;
  let authStore: MockStore;
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  const initialState = { user: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResetPasswordShellComponent, ResetPasswordDisplayComponent],
        imports: [ReactiveFormsModule, FormsModule],
        providers: [
          FormBuilder,
          provideMockStore({ initialState }),
          { provide: Router, useValue: routerSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              queryParams: of({ email: 'test@test.com', code: 'a1b2c3d4' }),
            },
          },
        ],
      });

      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(getPasswordResetSuccess, false);
      authStore.overrideSelector(getError, undefined);

      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should dispatch ResetPassword action when formSubmitted is called', () => {
    const form = { password: 'Password 1', confirmPassword: 'Password 1' };
    const credentials = new ResetPasswordCredentials('bob@bob.com', 'Password 1', 'a1b2c3d4');
    const dispatchSpy = jest.spyOn(authStore, 'dispatch');
    component.email = 'bob@bob.com';
    component.code = 'a1b2c3d4';
    component.formSubmitted(form);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ResetPassword({ credentials }));
  });

  test('should update observable errors when reset fails', () => {
    const errorMessages = ['email is invalid'];
    authStore.overrideSelector(getError, errorMessages);
    const spy = jest.spyOn(component.errorSubject, 'next');
    authStore.refreshState();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(errorMessages);
  });

  test('should update observable passwordReset when signup fails', () => {
    authStore.overrideSelector(getPasswordResetSuccess, true);
    const spy = jest.spyOn(component.passwordResetSuccessfulSubject, 'next');
    authStore.refreshState();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  test('should unsubscribe on destroy', () => {
    component['subscriptions '] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component.subscriptions.closed).toBeTruthy();
  });
});
