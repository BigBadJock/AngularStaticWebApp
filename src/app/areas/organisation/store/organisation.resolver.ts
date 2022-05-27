import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, filter } from 'rxjs/operators';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { User } from 'src/app/models/user.model';
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from 'jwt-decode';
import { Organisation } from 'src/app/models/organisation.model';
import { loadOrganisation } from './organisation.actions';
import { OrganisationState } from './organisation.reducers';
import { getOrganisation } from './organisation.selectors';

@Injectable()
export class OrganisationResolver implements Resolve<any> {
  currentUser$: Observable<User>;

  constructor(private store: Store<OrganisationState>, private authStore: Store<AuthState>) {}

  resolve(): Observable<any> {
    const userValue = localStorage.getItem('user');
    const user: User = JSON.parse(userValue);
    const { accessToken } = user;
    const token = jwt_decode(accessToken);
    // eslint-disable-next-line dot-notation
    const organisationId = token['ORGANISATION'];

    return this.store.pipe(
      select(getOrganisation),
      tap((organisation: Organisation) => {
        if (!organisation || organisation.id !== organisationId) {
          this.store.dispatch(loadOrganisation({ organisationId }));
        }
      }),
      filter((organisation) => !!organisation),
      first(),
    );
  }
}
