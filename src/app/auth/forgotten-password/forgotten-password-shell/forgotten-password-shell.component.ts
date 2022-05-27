import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthState } from '../../store/auth.reducers';
import { AuthActions } from '../../store/action-types';
import { getForgottenPasswordSent } from '../../store/auth.selectors';

@Component({
  selector: 'app-forgotten-password-shell',
  templateUrl: './forgotten-password-shell.component.html',
  styleUrls: ['./forgotten-password-shell.component.scss'],
})
export class ForgottenPasswordShellComponent implements OnInit, OnDestroy {
  errorSubject = new BehaviorSubject<string[]>(undefined);

  passwordSentSubject = new BehaviorSubject<boolean>(false);

  passwordSent$: Observable<boolean> = this.passwordSentSubject.asObservable();

  error$: Observable<string[]> = this.errorSubject.asObservable();

  subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(getForgottenPasswordSent)
        .pipe(
          tap((forgottenPasswordSent) => {
            this.passwordSentSubject.next(forgottenPasswordSent);
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  formSubmitted(form: any) {
    const { email } = form;
    this.store.dispatch(AuthActions.ForgottenPasswordRequest({ email }));
  }
}
