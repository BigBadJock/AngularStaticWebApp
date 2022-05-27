import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { OrganisationEffects } from './organisation.effects';
import { OrganisationService } from '../services/organisation.service';
import { Router } from '@angular/router';

describe('OrganisationEffects', () => {
  let actions$: Observable<any>;
  let effects: OrganisationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganisationEffects, provideMockActions(() => actions$), HttpClient, OrganisationService, Router],
    });

    effects = TestBed.inject(OrganisationEffects);
  });

  it('should be created', () => {
    pending();
    expect(effects).toBeTruthy();
  });
});
