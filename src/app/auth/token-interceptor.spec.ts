import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-Interceptor';
import { AuthService } from './services/auth.service';
import { User } from '../models/user.model';
import { OrganisationService } from '../areas/organisation/services/organisation.service';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let organisationService: OrganisationService;
  const user: User = {
    userName: 'bob',
    email: 'bob@bob.com',
    accessToken: 'AAA',
    refreshToken: 'BBB',
    firstName: 'bob',
    lastName: 'bob',
    organisationId: 'aaaa-bbbb',
    error: null,
  };
  const initialState = { user };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        OrganisationService,
        provideMockStore({ initialState }),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    organisationService = TestBed.get(OrganisationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  test('should add an Authorization header', () => {
    organisationService.loadOrganisation('aaaa-bbbb').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    setTimeout(() => {
      const httpRequest = httpMock.expectOne(`/api/organisations/1`);
      expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    });
  });

  test('should try to refreshToken if Auth token is expired', () => {
    pending();
  });
});
