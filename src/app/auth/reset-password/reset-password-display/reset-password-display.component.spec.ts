import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';
import { ResetPasswordDisplayComponent } from './reset-password-display.component';

describe('ResetPasswordDisplayComponent', () => {
  let component: ResetPasswordDisplayComponent;
  let fixture: ComponentFixture<ResetPasswordDisplayComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResetPasswordDisplayComponent],
        imports: [ReactiveFormsModule, FormsModule],
        providers: [FormBuilder],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form should be invalid when empty', () => {
    component.form.controls.password.setValue('');
    component.form.controls.confirmPassword.setValue('');

    expect(component.form.valid).toBeFalsy();
  });

  test('password - a blank password should return a required error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  test('password - a too short password should return a minlength error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abc');
    expect(password.hasError('minlength')).toBeTruthy();
  });

  test('password - a too long password should return a maxlength error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue(
      'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
    );
    expect(password.hasError('maxlength')).toBeTruthy();
  });

  test('password - a password without a digit should return a hasNumber error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(password.hasError('hasNumber')).toBeTruthy();
  });

  test('password - a password without an uppercase character should return a hasUpperCase error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(password.hasError('hasUpperCase')).toBeTruthy();
  });

  test('password - a password without an lowercase character should return a hasLowerCase error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(password.hasError('hasLowerCase')).toBeTruthy();
  });

  test('password - a password without an special character should return a hasSpecialCharacters error', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(password.hasError('hasSpecialCharacters')).toBeTruthy();
  });

  test('password - a valid password should be valid', () => {
    const { password } = component.form.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('Correct Horse Staple Battery 1');
    expect(password.valid).toBeTruthy();
  });

  test('confirmPassword - a blank confirmPassword should return a required error', () => {
    const { confirmPassword } = component.form.controls;
    expect(confirmPassword.valid).toBeFalsy();

    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();
  });

  test('confirmPassword - a confirmPassword which does not match password should return a PasswordMatch error', () => {
    const { password } = component.form.controls;
    const { confirmPassword } = component.form.controls;
    password.setValue('Correct Horse Staple Battery 1');
    confirmPassword.setValue('Correct Horse Staple Battery 2');
    expect(confirmPassword.hasError('PasswordMatch')).toBeTruthy();
  });

  test('confirmPassword - a confirmPassword which does match password should not return a PasswordMatch error', () => {
    const { password } = component.form.controls;
    const { confirmPassword } = component.form.controls;
    password.setValue('Correct Horse Staple Battery 1');
    confirmPassword.setValue('Correct Horse Staple Battery 1');
    expect(confirmPassword.hasError('PasswordMatch')).toBeFalsy();
  });

  test('reset button - should be disabled if form is invalid', () => {
    component.form.controls.password.setValue('');
    component.form.controls.confirmPassword.setValue('');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;

    expect(component.form.valid).toBeFalsy();
    expect(button.disabled).toBeTruthy();
  });

  test('reset button - should be enabled if form is valid', () => {
    component.form.controls.password.setValue('Correct Horse Staple Battery 1');
    component.form.controls.confirmPassword.setValue('Correct Horse Staple Battery 1');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  test('reset button - emits from value when clicked', () => {
    spyOn(component.formSubmitted, 'emit');

    component.form.controls.password.setValue('Correct Horse Staple Battery 1');
    component.form.controls.confirmPassword.setValue('Correct Horse Staple Battery 1');
    const button = fixture.nativeElement.querySelector('.btn');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith(component.form.value);
  });

  test('should show errors if reset failed', () => {
    component.errors$ = cold('-a|', { a: ['Error 1', 'Error 2'] });
    fixture.detectChanges();
    setTimeout(() => {
      const de = fixture.debugElement.query(By.css('.error-message'));
      const errorDisplay = de.nativeElement;

      expect(errorDisplay).toBeTruthy();
    });
  });
});
