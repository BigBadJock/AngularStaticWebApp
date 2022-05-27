import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthActions } from './action-types';
import { initialAuthState, authReducer } from './auth.reducers';

describe('Auth Reducer', () => {
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

  test('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = authReducer(undefined, action);
    expect(result).toBe(initialAuthState);
  });

  test('signUpFailure with single error should set signUpErrors with array with one entry', () => {
    const error = new HttpErrorResponse({ error: 'test' });
    const action = AuthActions.SignUpFailure({ error });
    const result = authReducer(initialAuthState, action);

    expect(result).toEqual({
      ...initialAuthState,
      error: ['test'],
    });
  });

  test('signUpFailure with multiple error should set signUpErrors with array with multiple entry', () => {
    const errors = ['test', 'test2'];
    const error = new HttpErrorResponse({ error: errors });
    const action = AuthActions.SignUpFailure({ error });
    const result = authReducer(initialAuthState, action);

    expect(result).toEqual({
      ...initialAuthState,
      error: errors,
    });
  });

  test('signInSuccess should set User', () => {
    const action = AuthActions.SignInSuccess({ user });
    const result = authReducer(initialAuthState, action);

    expect(result.user).toEqual(user);
  });

  test('signInFailure with single error should set signInErrors with array with one entry', () => {
    const error = new HttpErrorResponse({ error: 'test' });
    const action = AuthActions.SignInFailure({ error });
    const result = authReducer(initialAuthState, action);

    expect(result).toEqual({
      ...initialAuthState,
      error: ['test'],
    });
  });

  test('signInFailure with multiple error should set signInErrors with array with multiple entry', () => {
    const errors = ['test', 'test2'];
    const error = new HttpErrorResponse({ error: errors });
    const action = AuthActions.SignInFailure({ error });
    const result = authReducer(initialAuthState, action);

    expect(result).toEqual({
      ...initialAuthState,
      error: errors,
    });
  });
});
