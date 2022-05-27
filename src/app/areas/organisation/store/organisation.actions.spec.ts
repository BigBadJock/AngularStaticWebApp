import * as fromOrganisation from './organisation.actions';

describe('loadOrganisations', () => {
  it('should return an action', () => {
    expect(fromOrganisation.loadOrganisation({ organisationId: 'aaaa-bbbb' }).type).toBe(
      '[Organisation] Load Organisation',
    );
  });
});
