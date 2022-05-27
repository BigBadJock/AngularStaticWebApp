import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/models/user.model';
import { AuthService } from './auth.service';
import { SignUpCredentials } from '../models/signUpCredentials.model';
import { SignInCredentials } from '../models/signInCredentials.model';
import { RefreshTokenCredentials } from '../models/refreshTokenCredentials.model';
import { RefreshTokenResult } from '../models/refreshTokenResult.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('should be created', () => {
    expect(service).toBeDefined();
  });

  test('it should sign up a user', () => {
    const credentials = new SignUpCredentials(
      'Bob',
      'Last',
      'bob@bob.com',
      'This is My 1st Password',
      'This is My 1st Password',
    );

    const user: User = {
      email: 'bob@bob.com',
      accessToken: 'AAA',
      refreshToken: 'BBB',
      userName: '',
      firstName: '',
      lastName: '',
      organisationId: 'aaaa-bbbb',
      error: null,
    };

    service.signUp(credentials).subscribe((result) => {
      expect(result.user.email).toEqual('bob@bob.com');
    });

    const req = httpTestingController.expectOne('http://localhost:7071/api/account/register');
    expect(req.request.method).toEqual('POST');
    req.flush({ user });
  });

  test('it should sign in a user', () => {
    const credentials = new SignInCredentials('bob@bob.com', 'This is my 1st Password');

    const user: User = {
      email: 'bob@bob.com',
      accessToken: 'AAA',
      refreshToken: 'BBB',
      userName: '',
      firstName: '',
      lastName: '',
      organisationId: 'aaaa-bbbb',
      error: null,
    };

    service.signIn(credentials).subscribe((u: User) => {
      expect(u.email).toEqual('bob@bob.com');
    });

    const req = httpTestingController.expectOne('http://localhost:7071/api/account/signin');
    expect(req.request.method).toEqual('POST');
    req.flush({ user });
  });

  test('it should refresh a token', () => {
    const credentials: RefreshTokenCredentials = { userName: 'bob@bob.com', refreshToken: 'R3FR3SH-T0K3N' };
    const refreshTokenResult: RefreshTokenResult = { refreshToken: 'R3FR3SH-T0K3N-2', accessToken: 'N3W-4CC3SS-T0K3N' };

    service.refreshToken(credentials).subscribe((result: RefreshTokenResult) => {
      expect(result).toEqual(refreshTokenResult);
    });

    const req = httpTestingController.expectOne('http://localhost:7071/api/account/RefreshAccessToken');
    expect(req.request.method).toEqual('POST');
    req.flush({ refreshTokenResult });
  });
});
