import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrganisation from './organisation.reducers';

export const selectOrganisationState = createFeatureSelector<fromOrganisation.OrganisationState>(
  fromOrganisation.organisationFeatureKey,
);

export const getOrganisation = createSelector(selectOrganisationState, (organisation) => organisation.organisation);
