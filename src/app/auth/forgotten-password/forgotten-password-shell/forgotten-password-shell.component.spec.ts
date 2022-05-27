import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { createSpyObj } from 'jest-createspyobj';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ForgottenPasswordShellComponent } from './forgotten-password-shell.component';
import { ForgottenPasswordDisplayComponent } from '../forgotten-password-display/forgotten-password-display.component';
import { getForgottenPasswordSent, getError } from '../../store/auth.selectors';
import { ForgottenPasswordRequest } from '../../store/auth.actions';

describe('ForgottenPasswordShellComponent', () => {
  let component: ForgottenPasswordShellComponent;
  let fixture: ComponentFixture<ForgottenPasswordShellComponent>;
  let authStore: MockStore;
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  const initialState = { user: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ForgottenPasswordShellComponent, ForgottenPasswordDisplayComponent],
        imports: [ReactiveFormsModule, FormsModule, NgbAlertModule],
        providers: [FormBuilder, provideMockStore({ initialState }), { provide: Router, useValue: routerSpy }],
      });
      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(getForgottenPasswordSent, false);
      authStore.overrideSelector(getError, undefined);
      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPasswordShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call dispatch ForgottenPasswordRequest action when formSubmitted is called', () => {
    const form = { email: 'bob@bob.com' };
    const dispatchSpy = jest.spyOn(authStore, 'dispatch');
    component.formSubmitted(form);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ForgottenPasswordRequest({ email: form.email }));
  });

  // test('should update observable when password sent', () => {
  //   authStore.overrideSelector(getForgottenPasswordSent, true);
  //   const spy = jest.spyOn(component.passwordSentSubject, 'next');
  //   authStore.refreshState();
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalledTimes(1);
  //   expect(spy).toHaveBeenCalledWith(true);
  // });

  test('should unsubscribe on destroy', () => {
    component['subscriptions '] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component.subscriptions.closed).toBeTruthy();
  });
});
