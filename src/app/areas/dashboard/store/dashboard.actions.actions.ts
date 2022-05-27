import { createAction, props } from '@ngrx/store';
import { OrganisationStats } from 'src/app/models/organisationStats';

export const loadOrganisationStats = createAction(
  '[Dashboard.Actions] Load Dashboard Stats',
  props<{ organisationId: string }>(),
);

export const loadOrganisationStatsSuccess = createAction(
  '[Dashboard.Actions] Load Dashboard Stats Success',
  props<{ stats: OrganisationStats }>(),
);

export const loadOrganisationStatsFailure = createAction(
  '[Dashboard.Actions] Load Dashboard Stats Failure',
  props<{ error: any }>(),
);
