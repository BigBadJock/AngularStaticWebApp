import { createAction, props } from '@ngrx/store';
import { Organisation } from 'src/app/models/organisation.model';

export enum OrganisationActionTypes {
  LoadOrganisation = '[Organisation] Load Organisation',
  LoadOrganisationSuccess = '[Organisation] Load Organisation Success',
  LoadOrganisationFailure = '[Organisation] Load Organisation Failure',
}

export const loadOrganisation = createAction(
  OrganisationActionTypes.LoadOrganisation,
  props<{ organisationId: string }>(),
);

export const loadOrganisationSuccess = createAction(
  OrganisationActionTypes.LoadOrganisationSuccess,
  props<{ organisation: Organisation }>(),
);

export const loadOrganisationFailure = createAction(
  OrganisationActionTypes.LoadOrganisationFailure,
  props<{ error: any }>(),
);
