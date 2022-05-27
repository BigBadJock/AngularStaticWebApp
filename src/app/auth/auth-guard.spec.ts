import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth-guard';
import { isLoggedIn } from './store/auth.selectors';
import { SigninShellComponent } from './signin/signin-shell/signin-shell.component';
import { SigninModule } from './signin/signin.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authStore: MockStore;
  let router: Router;

  const initialState = { user: undefined };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SigninModule, RouterTestingModule.withRoutes([{ path: 'signin', component: SigninShellComponent }])],
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: {
            url: '/signin',
            events: of(new NavigationEnd(0, 'http://localhost:4200/signin', 'http://localhost:4200/signin')),
            navigate: jest.fn(),
          },
        },
      ],
    });
    authStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    guard = TestBed.inject(AuthGuard);
    authStore.overrideSelector(isLoggedIn, false);
  });

  test('should be created', () => {
    expect(guard).toBeTruthy();
  });

  test('it should return false if there is no user logged in', () => {
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      expect(router.navigate).toBeCalledWith('signin');
    });
  });

  test('it should reroute to signin page if there is no user logged in', () => {
    guard.canActivate().subscribe(() => {
      expect(router.navigate).toBeCalledWith('signin');
    });
  });

  test('it should return true if there is a user logged in', () => {
    authStore.overrideSelector(isLoggedIn, true);
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
    });
  });
});
