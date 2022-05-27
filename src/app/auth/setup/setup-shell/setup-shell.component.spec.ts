import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SetupDisplayComponent } from '../setup-display/setup-display.component';
import { SetupShellComponent } from './setup-shell.component';

describe('SetupShellComponent', () => {
  let component: SetupShellComponent;
  let fixture: ComponentFixture<SetupShellComponent>;
  let authStore: MockStore;
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);
  const initialState = { user: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [SetupShellComponent, MockComponent(SetupDisplayComponent)],
        providers: [FormBuilder, provideMockStore({ initialState }), { provide: Router, useValue: routerSpy }],
      });

      authStore = TestBed.inject(MockStore);

      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
