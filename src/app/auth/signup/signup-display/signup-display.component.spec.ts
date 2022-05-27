import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { cold } from 'jasmine-marbles';
import { SignupDisplayComponent } from './signup-display.component';

describe('SignupDisplayComponent', () => {
  let component: SignupDisplayComponent;
  let fixture: ComponentFixture<SignupDisplayComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [SignupDisplayComponent],
        providers: [FormBuilder],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form should be invalid when empty', () => {
    component.signupForm.controls.firstName.setValue('');
    component.signupForm.controls.lastName.setValue('');
    component.signupForm.controls.email.setValue('');
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.confirmPassword.setValue('');

    expect(component.signupForm.valid).toBeFalsy();
  });

  test('firstName - a blank firstName should return a required error', () => {
    const { firstName } = component.signupForm.controls;
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();
  });

  test('firstName - a too short firstName should return a minlength error', () => {
    const { firstName } = component.signupForm.controls;
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('a');
    expect(firstName.hasError('minlength')).toBeTruthy();
  });

  test('firstName - a too long firstName should return a maxlength error', () => {
    const { firstName } = component.signupForm.controls;
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(firstName.hasError('maxlength')).toBeTruthy();
  });

  test('lastName - a blank lastName should return a required error', () => {
    const { lastName } = component.signupForm.controls;
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();
  });

  test('lastName - a too short lastName should return a minlength error', () => {
    const { lastName } = component.signupForm.controls;
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('a');
    expect(lastName.hasError('minlength')).toBeTruthy();
  });

  test('lastName - a too long lastName should return a maxlength error', () => {
    const { lastName } = component.signupForm.controls;
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(lastName.hasError('maxlength')).toBeTruthy();
  });

  test('email - a blank email should return a required error', () => {
    const { email } = component.signupForm.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  test('email - an invalid email should return an email error', () => {
    const { email } = component.signupForm.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();
  });

  test('password - a blank password should return a required error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  test('password - a too short password should return a minlength error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abc');
    expect(password.hasError('minlength')).toBeTruthy();
  });

  test('password - a too long password should return a maxlength error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue(
      'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
    );
    expect(password.hasError('maxlength')).toBeTruthy();
  });

  test('password - a password without a digit should return a hasNumber error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(password.hasError('hasNumber')).toBeTruthy();
  });

  test('password - a password without an uppercase character should return a hasUpperCase error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('abcdefghijklmnopqrstuvwxyz');
    expect(password.hasError('hasUpperCase')).toBeTruthy();
  });

  test('password - a password without an lowercase character should return a hasLowerCase error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(password.hasError('hasLowerCase')).toBeTruthy();
  });

  test('password - a password without an special character should return a hasSpecialCharacters error', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(password.hasError('hasSpecialCharacters')).toBeTruthy();
  });

  test('password - a valid password should be valid', () => {
    const { password } = component.signupForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('Correct Horse Staple Battery 1');
    expect(password.valid).toBeTruthy();
  });

  test('confirmPassword - a blank confirmPassword should return a required error', () => {
    const { confirmPassword } = component.signupForm.controls;
    expect(confirmPassword.valid).toBeFalsy();

    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();
  });

  test('confirmPassword - a confirmPassword which does not match password should return a PasswordMatch error', () => {
    const { password } = component.signupForm.controls;
    const { confirmPassword } = component.signupForm.controls;
    password.setValue('Correct Horse Staple Battery 1');
    confirmPassword.setValue('Correct Horse Staple Battery 2');
    expect(confirmPassword.hasError('PasswordMatch')).toBeTruthy();
  });

  test('confirmPassword - a confirmPassword which does match password should not return a PasswordMatch error', () => {
    const { password } = component.signupForm.controls;
    const { confirmPassword } = component.signupForm.controls;
    password.setValue('Correct Horse Staple Battery 1');
    confirmPassword.setValue('Correct Horse Staple Battery 1');
    expect(confirmPassword.hasError('PasswordMatch')).toBeFalsy();
  });

  test('signup button - should be disabled if form is invalid', () => {
    component.signupForm.controls.firstName.setValue('');
    component.signupForm.controls.lastName.setValue('');
    component.signupForm.controls.email.setValue('');
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.confirmPassword.setValue('');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const htmlEl = buttonDE.nativeElement;

    expect(component.signupForm.valid).toBeFalsy();
    expect(htmlEl.disabled).toBeTruthy();
  });

  test('signup button - should be enabled if form is valid', () => {
    component.signupForm.controls.firstName.setValue('Bob');
    component.signupForm.controls.lastName.setValue('Last');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Correct Horse Staple Battery 1');
    component.signupForm.controls.confirmPassword.setValue('Correct Horse Staple Battery 1');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;
    fixture.detectChanges();
    expect(component.signupForm.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  test('signup button - emits form value when clicked', () => {
    spyOn(component.formSubmitted, 'emit');

    component.signupForm.controls.firstName.setValue('First');
    component.signupForm.controls.lastName.setValue('Last');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Correct Horse Staple Battery 1');
    component.signupForm.controls.confirmPassword.setValue('Correct Horse Staple Battery 1');
    const button = fixture.nativeElement.querySelector('.btn');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith(component.signupForm.value);
  });

  test('should show errors if signup failed', () => {
    component.errors$ = cold('-a|', { a: ['Error 1', 'Error 2'] });
    fixture.detectChanges();
    setTimeout(() => {
      const de = fixture.debugElement.query(By.css('.error-message'));
      const errorDisplay = de.nativeElement;

      expect(errorDisplay).toBeTruthy();
    });
  });
});
