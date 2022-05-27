import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utilities/customValidators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password-display',
  templateUrl: './reset-password-display.component.html',
  styleUrls: ['./reset-password-display.component.scss'],
})
export class ResetPasswordDisplayComponent {
  @Input() errors$: Observable<string[]>;

  @Input() passwordResetSuccessful$: Observable<boolean>;

  @Input() email: string;

  @Output() formSubmitted = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(99),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasUpperCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasLowerCase: true,
            }),
            // eslint-disable-next-line no-useless-escape
            CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
              hasSpecialCharacters: true,
            }),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      },
    );
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  submitForm(): void {
    this.formSubmitted.emit(this.form.value);
  }
}
