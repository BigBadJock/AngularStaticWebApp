import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateOrganisationDTO } from 'src/app/models/createOrganisation.dto';
import { SignUpCredentials } from '../models/signUpCredentials.model';
import { SignInCredentials } from '../models/signInCredentials.model';
import { RefreshTokenCredentials } from '../models/refreshTokenCredentials.model';
import { RefreshTokenResult } from '../models/refreshTokenResult.model';
import { ResetPasswordCredentials } from '../models/resetPasswordCredentials.model';

@Injectable()
export class AuthService {
  apiHost = environment.apiHost;

  constructor(private http: HttpClient) {}

  errorMsg: string;

  private static getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  signUp(signupCredentials: SignUpCredentials): Observable<any> {
    return this.http.post<User>(`${this.apiHost}/api/account/register`, signupCredentials);
  }

  signIn(credentials: SignInCredentials): Observable<User> {
    return this.http.post<any>(`${this.apiHost}/api/account/signin`, credentials).pipe(map((res) => res.user));
  }

  refreshToken(credentials: RefreshTokenCredentials): Observable<RefreshTokenResult> {
    return this.http.post<any>(`${this.apiHost}/api/account/RefreshAccessToken`, credentials);
  }

  forgottenPasswordRequest(email: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiHost}/api/account/ForgottenPasswordRequest/?userEmail=${email}`);
  }

  resetPassword(credentials: ResetPasswordCredentials): Observable<boolean> {
    return this.http.post<any>(`${this.apiHost}/api/account/resetPassword`, credentials);
  }

  saveOrganisation(organisation: CreateOrganisationDTO): Observable<any> {
    const url = `${this.apiHost}/api/organisation`;
    return this.http.post<CreateOrganisationDTO>(url, organisation).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = AuthService.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }),
    );
  }
}
