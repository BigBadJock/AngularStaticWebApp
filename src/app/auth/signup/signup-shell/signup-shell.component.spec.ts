import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SignupShellComponent } from './signup-shell.component';
import { SignupDisplayComponent } from '../signup-display/signup-display.component';
import { isLoggedIn, getError, getaccountCreationSuccess } from '../../store/auth.selectors';
import { SignUpCredentials } from '../../models/signUpCredentials.model';
import { SignUp } from '../../store/auth.actions';

describe('SignupShellComponent', () => {
  let component: SignupShellComponent;
  let fixture: ComponentFixture<SignupShellComponent>;
  let authStore: MockStore;
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  const initialState = { user: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [SignupShellComponent, SignupDisplayComponent],
        providers: [FormBuilder, provideMockStore({ initialState }), { provide: Router, useValue: routerSpy }],
      });
      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(isLoggedIn, false);
      authStore.overrideSelector(getaccountCreationSuccess, true);
      authStore.overrideSelector(getError, undefined);

      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call dispatch signup action when formSubmitted is called', () => {
    const form = {
      firstName: 'bob',
      lastName: 'bob',
      email: 'bob@bob.com',
      password: 'Password 1',
      confirmPassword: 'Password 1',
    };
    const credentials: SignUpCredentials = {
      firstName: 'bob',
      lastName: 'bob',
      email: 'bob@bob.com',
      password: 'Password 1',
      confirmPassword: 'Password 1',
    };
    const dispatchSpy = jest.spyOn(authStore, 'dispatch');
    component.formSubmitted(form);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(SignUp({ credentials }));
  });

  test('should update observable errors when signup fails', () => {
    const errorMessages = ['UserName is already used'];
    authStore.overrideSelector(getError, errorMessages);
    const spy = jest.spyOn(component.errorSubject, 'next');
    authStore.refreshState();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(errorMessages);
  });

  test('should unsubscribe on destroy', () => {
    component['subscriptions '] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component.subscriptions.closed).toBeTruthy();
  });
});
