import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { DashboardService } from '../services/dashboard.service';
import { DashboardActions } from './action-types';

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private router: Router, private dashboardService: DashboardService) {}

  getStats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadOrganisationStats),
      concatMap((action) =>
        this.dashboardService.getStats(action.organisationId).pipe(
          map((stats: OrganisationStats) => DashboardActions.loadOrganisationStatsSuccess({ stats })),
          catchError((error) => of(DashboardActions.loadOrganisationStatsFailure(error))),
        ),
      ),
    );
  });
}
