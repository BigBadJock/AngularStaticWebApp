import { createReducer, on } from '@ngrx/store';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { DashboardActions } from './action-types';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  stats: OrganisationStats;
  loaded: boolean;
  error: string[];
}

export const initialState: DashboardState = {
  stats: undefined,
  loaded: false,
  error: [],
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadOrganisationStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
    loaded: true,
  })),

  on(DashboardActions.loadOrganisationStatsFailure, (state, action) => {
    let errors: string[];
    if (action.error) {
      if (action.error.error instanceof Array) {
        errors = action.error.error;
      } else {
        errors = [action.error.error];
      }
    }
    return {
      stats: undefined,
      error: errors,
      loaded: false,
    };
  }),
);
