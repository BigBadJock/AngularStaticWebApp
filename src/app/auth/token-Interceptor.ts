import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthActions } from './store/action-types';
import { AuthService } from './services/auth.service';
import { RefreshTokenCredentials } from './models/refreshTokenCredentials.model';
import { RefreshTokenResult } from './models/refreshTokenResult.model';
import { AuthState } from './store/auth.reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  user: User;

  private static addToken({ request, token }: { request: HttpRequest<any>; token: string }): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  constructor(private authService: AuthService, private authStore: Store<AuthState>, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      request.url.includes('signin') ||
      request.url.includes('register') ||
      request.url.includes('RefreshAccessToken') ||
      request.url.includes('ForgottenPasswordRequest') ||
      request.url.includes('resetPassword')
    ) {
      return next.handle(request);
    }

    const token = this.getAccessToken();

    const authReq = TokenInterceptor.addToken({ request, token });

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      }),
    );
  }

  private getAccessToken() {
    const userValue = localStorage.getItem('user');
    this.user = JSON.parse(userValue) as User;
    return this.user.accessToken;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((accessToken) => {
          return next.handle(TokenInterceptor.addToken({ request, token: accessToken }));
        }),
      );
    }
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    const credentials = new RefreshTokenCredentials(this.user.email, this.user.refreshToken);

    return this.authService.refreshToken(credentials).pipe(
      switchMap((result: RefreshTokenResult) => {
        // update user
        const updatedUser: User = { ...this.user };
        updatedUser.accessToken = result.accessToken;
        updatedUser.refreshToken = result.refreshToken;
        // sign in user again to update store & local storage
        this.authStore.dispatch(AuthActions.SignInSuccess({ user: updatedUser }));

        this.refreshTokenSubject.next(result.accessToken);
        this.isRefreshing = false;
        return next.handle(TokenInterceptor.addToken({ request, token: result.accessToken }));
      }),
      catchError(() => {
        this.router.navigateByUrl('/signin');
        return of(null);
      }),
    );
  }
}
