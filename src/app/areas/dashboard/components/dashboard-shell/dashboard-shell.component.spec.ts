import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { MockComponent } from 'ng-mocks';
import { ApexChartComponent } from 'src/app/theme/shared/components/chart/apex-chart/apex-chart.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { createSpyObj } from 'jest-createspyobj';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/models/user.model';
import { of } from 'rxjs';
import { DashboardShellComponent } from './dashboard-shell.component';
import { getOrganisationStats, isLoaded, selectDashboardState } from '../../store/dashboard.selectors';
import { DashboardSiteInfoComponent } from '../dashboard-site-info/dashboard-site-info.component';
import { DashboardState } from '../../store/dashboard.reducer';

describe('DashboardShellComponent', () => {
  let component: DashboardShellComponent;
  let fixture: ComponentFixture<DashboardShellComponent>;
  let dashboardStore: MockStore<DashboardState>;
  let authStore: MockStore<AuthState>;

  const userWithoutOrg: User = {
    userName: 'bob@bob.com',
    email: 'bob@bob.com',
    organisationId: '00000000-0000-0000-0000-000000000000',
    firstName: 'bob',
    lastName: 'smith',
    accessToken: 'aaaaa',
    refreshToken: 'bbbb',
    error: [],
  };

  const userWithOrg: User = {
    userName: 'bob@bob.com',
    email: 'bob@bob.com',
    organisationId: '111111111-0000-0000-0000-000000000000',
    firstName: 'bob',
    lastName: 'smith',
    accessToken: 'aaaaa',
    refreshToken: 'bbbb',
    error: [],
  };

  const stats: OrganisationStats = {
    organisationId: '111111111-0000-0000-0000-000000000000',
    noOfSites: 1,
    noOfPlots: 10,
    unletPlots: 1,
    uncultivatedPlots: 1,
    waitingList: 1,
  };

  const dashboardInitialState = { loaded: false, stats: null, error: [] };
  const authInitialState = {
    user: userWithoutOrg,
    error: [],
  };
  const routerSpy = createSpyObj('Router', ['navigateByUrl']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          DashboardShellComponent,
          MockComponent(CardComponent),
          MockComponent(ApexChartComponent),
          MockComponent(DashboardSiteInfoComponent),
        ],
        imports: [],
        providers: [
          provideMockStore<AuthState>({ initialState: authInitialState }),
          provideMockStore<DashboardState>({ initialState: dashboardInitialState }),
          { provide: Router, useValue: routerSpy },
        ],
      });

      authStore = TestBed.inject(MockStore);
      authStore.overrideSelector(getCurrentUser, userWithoutOrg);

      dashboardStore = TestBed.inject(MockStore);
      dashboardStore.overrideSelector(isLoaded, false);

      TestBed.compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should redirect to setup if organisation is not set', () => {
    authStore.overrideSelector(getCurrentUser, userWithoutOrg);
    authStore.refreshState();
    fixture.detectChanges();
    //    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/setup');
  });

  test('should call dispatch when user has organisation', () => {
    const dispatchSpy = jest.spyOn(dashboardStore, 'dispatch');
    authStore.overrideSelector(getCurrentUser, userWithOrg);
    authStore.refreshState();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  // test('should have stats when user has organisation', () => {
  //   authStore.overrideSelector(getCurrentUser, userWithOrg);
  //   dashboardStore.overrideSelector(isLoaded, true);
  //   dashboardStore.overrideSelector(getOrganisationStats, stats);
  //   authStore.refreshState();
  //   fixture.detectChanges();
  //   expect(component.organisationStats).toBe(stats);
  // });

  // test('should unsubscribe on destroy', () => {
  //   component['subscriptions '] = of(true).subscribe();
  //   component.ngOnDestroy();
  //   expect(component.subscriptions.closed).toBeTruthy();
  // });
});
