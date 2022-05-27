import * as fromOrganisation from './organisation.reducers';
import { selectOrganisationState } from './organisation.selectors';

describe('Organisation Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrganisationState({
      [fromOrganisation.organisationFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
