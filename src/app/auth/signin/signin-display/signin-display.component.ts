import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-display',
  templateUrl: './signin-display.component.html',
  styleUrls: ['./signin-display.component.scss'],
})
export class SigninDisplayComponent {
  signinForm: FormGroup;

  @Input() error$: Observable<string>;

  @Output() formSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.signinForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    this.formSubmitted.emit(this.signinForm.value);
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
