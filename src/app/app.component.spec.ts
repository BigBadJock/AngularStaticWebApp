import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { SignInSuccess } from './auth/store/auth.actions';
import { User } from './models/user.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent, SpinnerComponent],
        providers: [provideMockStore()],
      });

      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      TestBed.compileComponents();
    }),
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Allotment-FrontEnd'`, () => {
    expect(component.title).toEqual('Allotment-FrontEnd');
  });

  test('should dispatch signInSuccess if localStorage contains user', () => {
    const user: User = {
      email: 'bob@bob.com',
      accessToken: 'AAA',
      refreshToken: 'BBB',
      userName: '',
      firstName: '',
      lastName: '',
      organisationId: 'aaaa-bbbb',
      error: null,
    };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(user));
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(SignInSuccess({ user }));
  });
});
