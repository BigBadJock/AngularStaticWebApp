import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from '../../store/auth.reducers';
import { ResetPasswordCredentials } from '../../models/resetPasswordCredentials.model';
import { AuthActions } from '../../store/action-types';
import { getError, getPasswordResetSuccess } from '../../store/auth.selectors';

@Component({
  selector: 'app-reset-password-shell',
  templateUrl: './reset-password-shell.component.html',
  styleUrls: ['./reset-password-shell.component.scss'],
})
export class ResetPasswordShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  errorSubject = new BehaviorSubject<string[]>(undefined);

  passwordResetSuccessfulSubject = new BehaviorSubject<boolean>(false);

  passwordResetSuccessful$: Observable<boolean> = this.passwordResetSuccessfulSubject.asObservable();

  errors$: Observable<string[]> = this.errorSubject.asObservable();

  email: string;

  code: string;

  constructor(private store: Store<AuthState>, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.email = params.email;
      this.code = params.code;
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store
        .select(getPasswordResetSuccess)
        .pipe(
          tap((success: boolean) => {
            if (success) {
              this.passwordResetSuccessfulSubject.next(success);
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  formSubmitted(form: any) {
    const credentials = new ResetPasswordCredentials(this.email, form.password, this.code);
    this.store.dispatch(AuthActions.ResetPassword({ credentials }));
  }
}
