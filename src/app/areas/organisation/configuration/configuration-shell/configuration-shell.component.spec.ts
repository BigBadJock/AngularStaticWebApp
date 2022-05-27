import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ConfigurationShellComponent } from './configuration-shell.component';
import { getOrganisation } from '../../store/organisation.selectors';

describe('ConfigurationShellComponent', () => {
  let component: ConfigurationShellComponent;
  let fixture: ComponentFixture<ConfigurationShellComponent>;
  let store: MockStore;
  const initialState = { organisation: undefined };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfigurationShellComponent],
        providers: [provideMockStore({ initialState })],
      });
      store = TestBed.inject(MockStore);
      store.overrideSelector(getOrganisation, undefined);
      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should retrieve the organisation', () => {
    pending();
  });
});
