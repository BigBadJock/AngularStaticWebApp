import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.DashboardState>(
  fromDashboard.dashboardFeatureKey,
);

export const getOrganisationStats = createSelector(selectDashboardState, (state) => state.stats);

export const isLoaded = createSelector(selectDashboardState, (state) => state.loaded);
