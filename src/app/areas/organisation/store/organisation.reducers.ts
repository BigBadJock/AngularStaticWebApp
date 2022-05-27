import { createReducer, on } from '@ngrx/store';
import { Organisation } from 'src/app/models/organisation.model';
import * as OrganisationActions from './organisation.actions';

export const organisationFeatureKey = 'organisationStore';

export interface OrganisationState {
  organisation: Organisation;
}

export const initialState: OrganisationState = {
  organisation: undefined,
};

export const reducer = createReducer(
  initialState,

  on(OrganisationActions.loadOrganisation, (state) => state),
  on(OrganisationActions.loadOrganisationSuccess, (state, { organisation }) => ({ organisation })),
  on(OrganisationActions.loadOrganisationFailure, () => {
    return {
      organisation: undefined,
    };
  }),
);

export function organisationReducer(state, action) {
  return reducer(state, action);
}
