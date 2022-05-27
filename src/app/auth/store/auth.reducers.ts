import { createReducer, on, State } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import jwt_decode from 'jwt-decode';
import { AuthActions } from './action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  forgottenPasswordSent?: boolean;
  passwordResetSuccess?: boolean;
  accountCreationSuccess?: boolean;
  setupComplete?: boolean;
  tokenRefreshed?: boolean;
  error: string[];
}

export const initialAuthState: AuthState = {
  user: undefined,
  error: [],
};

const reducer = createReducer(
  initialAuthState,

  on(AuthActions.SignUpSuccess, (state) => ({
    ...state,
    accountCreationSuccess: true,
  })),

  on(AuthActions.SignUpFailure, (state, action) => {
    let errors: string[];
    if (action.error) {
      if (action.error.error instanceof Array) {
        errors = action.error.error;
      } else {
        errors = [action.error.error];
      }
    }
    return {
      user: undefined,
      error: errors,
    };
  }),

  on(AuthActions.SignInSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  on(AuthActions.CheckExpiry, (state, { user }) => ({
    ...state,
    user,
  })),

  on(AuthActions.SignInFailure, (state, action) => {
    let errors: string[];
    if (action.error.error instanceof Array) {
      errors = action.error.error;
    } else {
      errors = [action.error.error];
    }
    return {
      user: undefined,
      error: errors,
    };
  }),

  on(AuthActions.SignOut, () => {
    return {
      user: undefined,
    };
  }),

  on(AuthActions.Clear, () => {
    return initialAuthState;
  }),

  on(AuthActions.ForgottenPasswordRequestSuccess, (state, action) => ({
    ...state,
    forgottenPasswordSent: action.result,
  })),

  on(AuthActions.ResetPasswordSuccess, (state, action) => ({
    ...state,
    passwordResetSuccess: action.result,
  })),

  on(AuthActions.ResetPasswordFailure, (state, action) => {
    let errors: string[];
    if (action.error.error instanceof Array) {
      errors = action.error.error;
    } else {
      errors = [action.error.error];
    }
    return {
      user: undefined,
      error: errors,
    };
  }),

  on(AuthActions.CreateOrganisationSuccess, (state) => ({
    ...state,
    setupComplete: true,
  })),

  on(AuthActions.RefreshTokenSuccess, (state, action) => {
    const token = jwt_decode(action.payload.accessToken);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const orgId = token['ORGANISATION'];

    const u: User = state.user;
    const updatedUser: User = {
      userName: u.userName,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      organisationId: orgId,
      error: null,
    };

    const userValue = JSON.stringify(updatedUser);
    localStorage.setItem('user', userValue);

    return {
      ...state,
      user: updatedUser,
      tokenRefreshed: true,
    };
  }),

  on(AuthActions.RefreshTokenFailure, (state, action) => {
    let errors: string[];
    if (action.error.error instanceof Array) {
      errors = action.error.error;
    } else {
      errors = [action.error.error];
    }
    return {
      user: undefined,
      error: errors,
    };
  }),
);

export function authReducer(state, action) {
  return reducer(state, action);
}
