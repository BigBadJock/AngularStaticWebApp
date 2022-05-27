import { Injectable } from '@angular/core';
import { tap, catchError, concatMap, map, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthActions } from './action-types';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes } from './auth.actions';
import { AuthState } from './auth.reducers';
import { RefreshTokenResult } from '../models/refreshTokenResult.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SignUp),
      concatMap((action) =>
        this.authService.signUp(action.credentials).pipe(
          map((user: User) => AuthActions.SignUpSuccess({ user })),
          catchError((error) => of(AuthActions.SignUpFailure({ error }))),
        ),
      ),
    );
  });

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SignIn),
      concatMap((action) =>
        this.authService.signIn(action.credentials).pipe(
          map((user: User) => AuthActions.SignInSuccess({ user })),
          catchError((error) => of(AuthActions.SignInFailure({ error }))),
        ),
      ),
    );
  });

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SignInSuccess),
        tap((action) => {
          const { user } = action;
          const userValue = JSON.stringify(user);
          localStorage.setItem('user', userValue);
        }),
      ),
    { dispatch: false },
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SignOut),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('breadcrumbHistory');
          this.router.navigateByUrl('/signin');
        }),
      ),
    { dispatch: false },
  );

  forgottenPasswordRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.ForgottenPasswordRequest),
      concatMap((action) =>
        this.authService
          .forgottenPasswordRequest(action.email)
          .pipe(map((result: boolean) => AuthActions.ForgottenPasswordRequestSuccess({ result }))),
      ),
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.ResetPassword),
      concatMap((action) =>
        this.authService.resetPassword(action.credentials).pipe(
          map((result: boolean) => AuthActions.ResetPasswordSuccess({ result })),
          catchError((error) => of(AuthActions.ResetPasswordFailure({ error }))),
        ),
      ),
    );
  });

  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.RefreshToken),
      concatMap((action) =>
        this.authService.refreshToken(action.payload).pipe(
          tap((result: RefreshTokenResult) => console.log(result.accessToken)),
          map((result: RefreshTokenResult) => AuthActions.RefreshTokenSuccess({ payload: result })),
          catchError((error) => of(AuthActions.RefreshTokenFailure({ error }))),
        ),
      ),
    );
  });

  refreshTokenFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.RefreshTokenFailure),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/signin');
        }),
      ),
    { dispatch: false },
  );

  CreateOrganisations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.CreateOrganisation),
      exhaustMap((action) =>
        this.authService.saveOrganisation(action.organisation).pipe(
          map((organisation) => AuthActions.CreateOrganisationSuccess({ organisation })),
          catchError((error) => of(AuthActions.CreateOrganisationFailure({ error }))),
        ),
      ),
    );
  });
}
