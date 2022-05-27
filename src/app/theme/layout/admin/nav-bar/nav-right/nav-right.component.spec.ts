import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockDirective } from 'ng-mocks';
import { SignOut } from 'src/app/auth/store/auth.actions';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';
import { GravatarDirective } from 'src/app/utilities/directives/gravatar/gravatar.directive';
import { NavRightComponent } from './nav-right.component';

describe('NavRightComponent', () => {
  let component: NavRightComponent;
  let fixture: ComponentFixture<NavRightComponent>;
  let authStore: MockStore<AuthState>;
  const initialState = {
    user: null,
    error: [],
  } as AuthState;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavRightComponent, MockDirective(GravatarDirective)],
        providers: [provideMockStore({ initialState })],
      });
      authStore = TestBed.inject(MockStore);

      const user = {
        userName: 'bob',
        email: 'bob@bob.com',
        firstName: 'john',
        lastName: 'Smith',
        accessToken: 'xx',
        refreshToken: 'xx',
        organisationId: 'aaaa-bbb',
        error: [],
      };

      authStore.overrideSelector(getCurrentUser, user);

      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signOut action when signOut is clicked', () => {
    const dispatchSpy = jest.spyOn(authStore, 'dispatch');
    component.signOut();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(SignOut());
  });
});
