import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { SigninShellComponent } from './signin-shell.component';
import { SigninDisplayComponent } from '../signin-display/signin-display.component';
import { isLoggedIn, getError } from '../../store/auth.selectors';
import { SignInCredentials } from '../../models/signInCredentials.model';
import { SignIn } from '../../store/auth.actions';

describe('SigninShellComponent', () => {
  let component: SigninShellComponent;
  let fixture: ComponentFixture<SigninShellComponent>;
  let authStore: MockStore;
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  const initialState = { user: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [SigninShellComponent, SigninDisplayComponent],
        providers: [FormBuilder, provideMockStore({ initialState }), { provide: Router, useValue: routerSpy }],
      });

      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(isLoggedIn, false);
      authStore.overrideSelector(getError, undefined);
      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call dispatch signin action when formSubmitted is called', () => {
    const form = { email: 'bob@bob.com', password: 'Password 1' };
    const credentials: SignInCredentials = { email: 'bob@bob.com', password: 'Password 1' };
    const dispatchSpy = jest.spyOn(authStore, 'dispatch');
    component.formSubmitted(form);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(SignIn({ credentials }));
  });

  test('should route to "/" when signin successful', () => {
    authStore.overrideSelector(isLoggedIn, true);
    authStore.refreshState();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  test('should unsubscribe on destroy', () => {
    component['subscriptions '] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component.subscriptions.closed).toBeTruthy();
  });

  test('should receive errors from selector and forward them on', () => {
    const errorMessage = ['Invalid Username or password'];
    authStore.overrideSelector(getError, errorMessage);
    const spy = jest.spyOn(component.errorSubject, 'next');
    authStore.refreshState();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(errorMessage);
  });
});
