import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideDirective } from 'ng-click-outside';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockDirective } from 'ng-mocks';
import { GravatarDirective } from 'src/app/utilities/directives/gravatar/gravatar.directive';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';
import { NavContentComponent } from './nav-content.component';
import { NavigationItem } from '../navigation';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

describe('NavContentComponent', () => {
  let component: NavContentComponent;
  let fixture: ComponentFixture<NavContentComponent>;
  let authStore: MockStore<AuthState>;
  const initialState = {
    user: null,
    error: [],
  } as AuthState;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          NavContentComponent,
          MockDirective(ClickOutsideDirective),
          MockDirective(GravatarDirective),
          MockComponent(NavBarComponent),
          MockComponent(NavGroupComponent),
          MockComponent(NavCollapseComponent),
          MockComponent(NavItemComponent),
        ],
        providers: [provideMockStore({ initialState }), NavigationItem],
        imports: [RouterTestingModule, PerfectScrollbarModule],
      });

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

      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(getCurrentUser, user);
      TestBed.compileComponents();
    }),
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(NavContentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
