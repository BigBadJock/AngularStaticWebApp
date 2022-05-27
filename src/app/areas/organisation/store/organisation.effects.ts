import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { OrganisationService } from '../services/organisation.service';
import { OrganisationActions } from './action-types';

@Injectable()
export class OrganisationEffects {
  constructor(private actions$: Actions, private organisationService: OrganisationService, private router: Router) {}

  loadOrganisations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganisationActions.loadOrganisation),
      concatMap((action) => this.organisationService.loadOrganisation(action.organisationId)),
      map((organisation) => OrganisationActions.loadOrganisationSuccess({ organisation })),
      catchError((error) => of(OrganisationActions.loadOrganisationFailure({ error }))),
    );
  });
}
