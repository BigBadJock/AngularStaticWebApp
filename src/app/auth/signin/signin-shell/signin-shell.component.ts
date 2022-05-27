import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthState } from '../../store/auth.reducers';
import { SignInCredentials } from '../../models/signInCredentials.model';
import { AuthActions } from '../../store/action-types';
import { isLoggedIn, getError } from '../../store/auth.selectors';

@Component({
  selector: 'app-signin-shell',
  templateUrl: './signin-shell.component.html',
  styleUrls: ['./signin-shell.component.scss'],
})
export class SigninShellComponent implements OnInit, OnDestroy {
  errorSubject = new BehaviorSubject<string[]>(undefined);

  error$: Observable<string[]> = this.errorSubject.asObservable();

  subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.Clear());

    this.subscriptions.add(
      this.store
        .select(isLoggedIn)
        .pipe(
          tap((loggedIn) => {
            if (loggedIn) {
              this.router.navigateByUrl('/');
            }
          }),
        )
        .subscribe(),
    );

    this.subscriptions.add(
      this.store
        .select(getError)
        .pipe(
          tap((error) => {
            this.errorSubject.next(error);
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  formSubmitted(form: any) {
    const credentials = new SignInCredentials(form.email, form.password);
    this.store.dispatch(AuthActions.SignIn({ credentials }));
  }
}
