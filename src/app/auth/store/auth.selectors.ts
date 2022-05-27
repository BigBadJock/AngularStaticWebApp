import { JwtHelperService } from '@auth0/angular-jwt';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);

export const isLoggedIn = createSelector(selectAuthState, (authState) => {
  if (authState.user && authState.user.accessToken) {
    const jwtHelper = new JwtHelperService();
    //    if (jwtHelper.getTokenExpirationDate(authState.user.accessToken) > new Date()) {
    return true;
    //    }
  }
  return false;
});

export const isExpired = createSelector(selectAuthState, (authState) => {
  if (authState.user && authState.user.accessToken) {
    const jwtHelper = new JwtHelperService();
    if (jwtHelper.getTokenExpirationDate(authState.user.accessToken) > new Date()) {
      return false;
    }
  }
  return true;
});

export const getError = createSelector(selectAuthState, (authState) => authState.error);

export const getCurrentUser = createSelector(selectAuthState, (authState) => authState.user);

export const getAccessToken = createSelector(selectAuthState, (authState) => authState.user.accessToken);

export const getForgottenPasswordSent = createSelector(selectAuthState, (authState) => authState.forgottenPasswordSent);

export const getPasswordResetSuccess = createSelector(selectAuthState, (authState) => authState.passwordResetSuccess);

export const getaccountCreationSuccess = createSelector(
  selectAuthState,
  (authState) => authState.accountCreationSuccess,
);

export const isSetupComplete = createSelector(selectAuthState, (authState) => authState.setupComplete);

export const isTokenRefreshed = createSelector(selectAuthState, (authState) => authState.tokenRefreshed);
