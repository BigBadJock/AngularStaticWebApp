import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { SigninDisplayComponent } from './signin-display.component';

describe('SigninDisplayComponent', () => {
  let component: SigninDisplayComponent;
  let fixture: ComponentFixture<SigninDisplayComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [SigninDisplayComponent],
        providers: [FormBuilder],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    component.error$ = of('');
    expect(component).toBeTruthy();
  });

  test('form should be invalid when empty', () => {
    component.signinForm.controls.email.setValue('');
    component.signinForm.controls.password.setValue('');

    expect(component.signinForm.valid).toBeFalsy();
  });

  test('email - a blank email should return a required error', () => {
    const { email } = component.signinForm.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  test('email - an invalid email should return an email error', () => {
    const { email } = component.signinForm.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();
  });

  test('password - a blank password should return a required error', () => {
    const { password } = component.signinForm.controls;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  test('signin button - should be disabled if form is invalid', () => {
    component.signinForm.controls.email.setValue('');
    component.signinForm.controls.password.setValue('');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const htmlEl = buttonDE.nativeElement;

    expect(component.signinForm.valid).toBeFalsy();
    expect(htmlEl.disabled).toBeTruthy();
  });

  test('signin button - should be enabled if form is valid', () => {
    component.signinForm.controls.email.setValue('test@test.com');
    component.signinForm.controls.password.setValue('Correct Horse Staple Battery 1');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;
    fixture.detectChanges();
    expect(component.signinForm.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  test('signin button - emits from value when clicked', () => {
    spyOn(component.formSubmitted, 'emit');

    component.signinForm.controls.email.setValue('test@test.com');
    component.signinForm.controls.password.setValue('Correct Horse Staple Battery 1');
    const button = fixture.nativeElement.querySelector('.btn');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith(component.signinForm.value);
  });

  test('should show errors if signin failed', () => {
    component.error$ = cold('-a|', { a: ['Error 1', 'Error 2'] });
    fixture.detectChanges();
    setTimeout(() => {
      const de = fixture.debugElement.query(By.css('.error-message'));
      const errorDisplay = de.nativeElement;

      expect(errorDisplay).toBeTruthy();
    });
  });
});
