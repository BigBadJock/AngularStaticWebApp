import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { ForgottenPasswordDisplayComponent } from './forgotten-password-display.component';

describe('ForgottenPasswordDisplayComponent', () => {
  let component: ForgottenPasswordDisplayComponent;
  let fixture: ComponentFixture<ForgottenPasswordDisplayComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ForgottenPasswordDisplayComponent],
        imports: [ReactiveFormsModule, FormsModule, NgbAlertModule],
        providers: [FormBuilder],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPasswordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form should be invalid when empty', () => {
    component.form.controls.email.setValue('');

    expect(component.form.valid).toBeFalsy();
  });

  test('email - a blank email should return a required error', () => {
    const { email } = component.form.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  test('email - an invalid email should return an email error', () => {
    const { email } = component.form.controls;
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();
  });

  test('reset button - should be disabled if form is invalid', () => {
    component.form.controls.email.setValue('');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;
    expect(component.form.valid).toBeFalsy();
    expect(button.disabled).toBeTruthy();
  });

  test('reset button - should be enabled if form is valid', () => {
    component.form.controls.email.setValue('test@test.com');
    const buttonDE = fixture.debugElement.query(By.css('.btn'));
    const button = buttonDE.nativeElement;
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });
});
