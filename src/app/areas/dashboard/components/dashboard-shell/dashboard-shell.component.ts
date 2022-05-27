import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { empty, Subscription } from 'rxjs';
import { concatMap, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { User } from 'src/app/models/user.model';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { loadOrganisationStats } from '../../store/dashboard.actions.actions';
import { DashboardState } from '../../store/dashboard.reducer';
import { getOrganisationStats, isLoaded } from '../../store/dashboard.selectors';

@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss'],
})
export class DashboardShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  public rentalChartOptions: any;

  public uncultivatedChartOptions: any;

  town: string;

  lat: number;

  lon: number;

  organisationStats: any;

  currentUser: User;

  static buildDonutChart(labels: string[], data: number[]) {
    const options = {
      series: data,
      chart: {
        width: 50,
        type: 'pie',
      },
      labels,
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
    };
    return options;
  }

  constructor(
    private breadCrumbService: BreadcrumbService,
    private store: Store<DashboardState>,
    private authStore: Store<AuthState>,
    private router: Router,
  ) {
    this.breadCrumbService.add(new Breadcrumb('Dashboard', '/dashboard'));
  }

  ngOnInit() {
    this.town = 'Brentwood';
    this.lat = 51.62;
    this.lon = 0.31;
    this.rentalChartOptions = DashboardShellComponent.buildDonutChart(['Let', 'Unlet'], [429, 21]);
    this.uncultivatedChartOptions = DashboardShellComponent.buildDonutChart(['Cultivated', 'Uncultivated'], [400, 50]);

    this.subscriptions.add(
      this.authStore
        .select(getCurrentUser)
        .pipe(
          switchMap((currentUser: User) => {
            this.currentUser = currentUser;

            const { organisationId } = this.currentUser;
            if (organisationId === null || organisationId === '00000000-0000-0000-0000-000000000000') {
              this.router.navigateByUrl('/setup');
              return empty();
            }

            return this.store.pipe(
              select(isLoaded),
              tap((loaded) => {
                if (!loaded) {
                  this.store.dispatch(loadOrganisationStats({ organisationId }));
                }

                this.subscriptions.add(
                  this.store
                    .select(getOrganisationStats)
                    .pipe(
                      map((stats: OrganisationStats) => {
                        this.organisationStats = stats;
                      }),
                    )
                    .subscribe(),
                );
              }),
              filter((loaded) => !!loaded),
              first(),
            );
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
