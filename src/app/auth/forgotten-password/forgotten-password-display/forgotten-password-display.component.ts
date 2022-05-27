import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgotten-password-display',
  templateUrl: './forgotten-password-display.component.html',
  styleUrls: ['./forgotten-password-display.component.scss'],
})
export class ForgottenPasswordDisplayComponent {
  form: FormGroup;

  @Input() error$: Observable<string>;

  @Input() passwordSent$: Observable<boolean>;

  @Output() formSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    this.formSubmitted.emit(this.form.value);
  }

  get email() {
    return this.form.get('email');
  }
}
