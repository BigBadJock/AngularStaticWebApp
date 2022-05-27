import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { CheckExpiry } from './store/auth.actions';
import { AuthState } from './store/auth.reducers';
import { isExpired, isLoggedIn } from './store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    const userValue = localStorage.getItem('user');
    const user: User = JSON.parse(userValue);

    this.store.dispatch(CheckExpiry({ user }));
    return combineLatest([this.store.pipe(select(isLoggedIn)), this.store.pipe(select(isExpired))]).pipe(
      tap(([loggedIn, expired]) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/signin');
        }
      }),
      map(([loggedIn, expired]) => loggedIn || expired),
    );
  }
}
