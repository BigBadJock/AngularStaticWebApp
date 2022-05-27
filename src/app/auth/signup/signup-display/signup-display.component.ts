import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utilities/customValidators';
import { Observable } from 'rxjs';
import { SignUpCredentials } from '../../models/signUpCredentials.model';

@Component({
  selector: 'app-signup-display',
  templateUrl: './signup-display.component.html',
  styleUrls: ['./signup-display.component.scss'],
})
export class SignupDisplayComponent {
  @Input() errors$: Observable<string[]>;

  @Input() accountCreationSuccessful$: Observable<boolean>;

  @Output() formSubmitted = new EventEmitter();

  signupForm: FormGroup;

  signUp: SignUpCredentials;

  constructor(private fb: FormBuilder) {
    this.signupForm = fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
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

  submitForm(): void {
    this.formSubmitted.emit(this.signupForm.value);
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
