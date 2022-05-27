import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { createSpyObj } from 'jest-createspyobj';
import { User } from 'src/app/models/user.model';
import { hot, cold } from 'jasmine-marbles';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './action-types';
import { SignUpCredentials } from '../models/signUpCredentials.model';
import { SignInCredentials } from '../models/signInCredentials.model';

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let service: AuthService;

  const user: User = {
    email: 'bob@bob.com',
    accessToken: 'AAA',
    refreshToken: 'BBB',
    userName: '',
    firstName: '',
    lastName: '',
    organisationId: 'aaaa-bbbb',
    error: null,
  };

  const signUpCredentials = new SignUpCredentials(
    'firstname',
    'lastname',
    'bob@bob.com',
    'This is My 1st Password',
    'This is My 1st Password',
  );

  const signInCredentials = new SignInCredentials('bob@bob.com', 'This is My 1st Password');

  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    effects = TestBed.get(AuthEffects);
    service = TestBed.get(AuthService);
  });

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('signUp', () => {
    test('should return a SignUpSuccess action, with the user, on success', () => {
      const action = AuthActions.SignUp({ credentials: signUpCredentials });
      const outcome = AuthActions.SignUpSuccess({ user });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: outcome });
      service.signUp = jest.fn(() => response);

      expect(effects.signUp$).toBeObservable(expected);
    });

    test('should return a SignupFailure action, with an error, on failure', () => {
      const action = AuthActions.SignUp({ credentials: signUpCredentials });
      const error = new Error('some error');
      const outcome = AuthActions.SignUpFailure({ error });

      actions = hot('-a|', { a: action });
      const response = cold('-#|', {}, error);
      service.signUp = jest.fn(() => response);

      const expected = cold('--(b|)', { b: outcome });
      expect(effects.signUp$).toBeObservable(expected);
    });
  });

  describe('signUpSuccess', () => {
    test('should add user to local storage', () => {
      const action = AuthActions.SignUpSuccess({ user });
      const userValue = JSON.stringify(user);
      const spy = jest.spyOn(Storage.prototype, 'setItem');

      actions = hot('-a', { a: action });
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('user', userValue);
      }, 500);
    });
  });

  describe('signIn', () => {
    test('should return a SignInSuccess action, with the user, on success', () => {
      const action = AuthActions.SignIn({ credentials: signInCredentials });
      const outcome = AuthActions.SignInSuccess({ user });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: outcome });
      service.signIn = jest.fn(() => response);

      expect(effects.signIn$).toBeObservable(expected);
    });

    test('should return a SignInFailure action, with an error, on failure', () => {
      const action = AuthActions.SignIn({ credentials: signInCredentials });
      const error = new Error();
      const outcome = AuthActions.SignInFailure({ error });

      actions = hot('-a|', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b|)', { b: outcome });
      service.signIn = jest.fn(() => response);

      expect(effects.signIn$).toBeObservable(expected);
    });
  });

  describe('signInSuccess', () => {
    test('should add user to local storage', () => {
      const action = AuthActions.SignInSuccess({ user });
      const userValue = JSON.stringify(user);
      const spy = jest.spyOn(Storage.prototype, 'setItem');

      actions = hot('-a', { a: action });
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('user', userValue);
      }, 500);
    });
  });

  describe('signOut', () => {
    test('should remove user form local storage', () => {
      const action = AuthActions.SignOut();
      const spy = jest.spyOn(Storage.prototype, 'removeItem');

      actions = hot('-a', { a: action });
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('user');
      }, 500);
    });

    test('should navigate to signIn page', () => {
      const action = AuthActions.SignOut();

      actions = hot('-a', { a: action });
      setTimeout(() => {
        expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/signup');
      }, 500);
    });
  });
});
