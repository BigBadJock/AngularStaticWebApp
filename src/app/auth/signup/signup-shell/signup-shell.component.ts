import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthState } from '../../store/auth.reducers';
import { SignUpCredentials } from '../../models/signUpCredentials.model';
import { AuthActions } from '../../store/action-types';
import { getError, getaccountCreationSuccess } from '../../store/auth.selectors';

@Component({
  selector: 'app-signup-shell',
  templateUrl: './signup-shell.component.html',
  styleUrls: ['./signup-shell.component.scss'],
})
export class SignupShellComponent implements OnInit, OnDestroy {
  errorSubject = new BehaviorSubject<string[]>(undefined);

  errors$: Observable<string[]> = this.errorSubject.asObservable();

  accountCreationSuccessfulSubject = new BehaviorSubject<boolean>(false);

  accountCreationSuccessful$: Observable<boolean> = this.accountCreationSuccessfulSubject.asObservable();

  subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.Clear());

    this.subscriptions.add(
      this.store
        .select(getaccountCreationSuccess)
        .pipe(
          tap((success: boolean) => {
            if (success) {
              this.accountCreationSuccessfulSubject.next(success);
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
    const credentials = new SignUpCredentials(
      form.firstName,
      form.lastName,
      form.email,
      form.password,
      form.confirmPassword,
    );
    this.store.dispatch(AuthActions.SignUp({ credentials }));
  }
}
