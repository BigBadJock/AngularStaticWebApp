import { createAction, props } from '@ngrx/store';
import { CreateOrganisationDTO } from 'src/app/models/createOrganisation.dto';
import { Organisation } from 'src/app/models/organisation.model';
import { User } from '../../models/user.model';
import { SignInCredentials } from '../models/signInCredentials.model';
import { SignUpCredentials } from '../models/signUpCredentials.model';
import { RefreshTokenResult } from '../models/refreshTokenResult.model';
import { ResetPasswordCredentials } from '../models/resetPasswordCredentials.model';
import { RefreshTokenCredentials } from '../models/refreshTokenCredentials.model';

export enum AuthActionTypes {
  SignUp = '[SignUp Page] User SignUp',
  SignUpSuccess = '[SignUp Page] User SignUp Success',
  SignUpFailure = '[SignUp Page] User SignUp Failure',
  SignIn = '[SignIn Page] User SignIn',
  SignInSuccess = '[SignIn Page] User SignIn Success',
  SignInFailure = '[SignIn Page] User SignIn Failure',
  UserSignOut = '[Top Menu] User SignOut',
  Clear = '[Auth] Clear',
  RefreshToken = '[AuthGuard] refeshToken',
  RefreshTokenSuccess = '[AuthGuard] refeshToken success',
  RefreshTokenFailure = '[AuthGuard] refeshToken Failure',
  CheckExpiry = '[AuthGuard] checkExpiry',
  ForgottenPassword = '[Forgottent Password Page] Forgot Password Request',
  ForgottenPasswordSuccess = '[Forgottent Password Page] Forgot Password Request Success',
  ResetPassword = '[Reset Password Page] Reset Password',
  ResetPasswordSuccess = '[Reset Password Page] Reset Password Success',
  ResetPasswordFailure = '[Reset Password Page] Reset Password Failure',

  CreateOrganisation = '[Setup] Create Organisation',
  CreateOrganisationSuccess = '[Setup] Create Organisation Success',
  CreateOrganisationFailure = '[Setup] Create Organisation Failure',
}

export const SignUp = createAction(AuthActionTypes.SignUp, props<{ credentials: SignUpCredentials }>());

export const SignUpSuccess = createAction(AuthActionTypes.SignUpSuccess, props<{ user: User }>());

export const SignUpFailure = createAction(AuthActionTypes.SignUpFailure, props<{ error: any }>());

export const SignIn = createAction(AuthActionTypes.SignIn, props<{ credentials: SignInCredentials }>());

export const SignInSuccess = createAction(AuthActionTypes.SignInSuccess, props<{ user: User }>());

export const SignInFailure = createAction(AuthActionTypes.SignInFailure, props<{ error: any }>());

export const SignOut = createAction(AuthActionTypes.UserSignOut);

export const Clear = createAction(AuthActionTypes.Clear);

export const RefreshToken = createAction(AuthActionTypes.RefreshToken, props<{ payload: RefreshTokenCredentials }>());

export const RefreshTokenSuccess = createAction(
  AuthActionTypes.RefreshTokenSuccess,
  props<{ payload: RefreshTokenResult }>(),
);

export const RefreshTokenFailure = createAction(AuthActionTypes.RefreshTokenFailure, props<{ error: any }>());

export const CheckExpiry = createAction(AuthActionTypes.CheckExpiry, props<{ user: User }>());

export const ForgottenPasswordRequest = createAction(AuthActionTypes.ForgottenPassword, props<{ email: string }>());

export const ForgottenPasswordRequestSuccess = createAction(
  AuthActionTypes.ForgottenPasswordSuccess,
  props<{ result: boolean }>(),
);

export const ResetPassword = createAction(
  AuthActionTypes.ResetPassword,
  props<{ credentials: ResetPasswordCredentials }>(),
);

export const ResetPasswordSuccess = createAction(AuthActionTypes.ResetPasswordSuccess, props<{ result: boolean }>());

export const ResetPasswordFailure = createAction(AuthActionTypes.ResetPasswordFailure, props<{ error: any }>());

export const CreateOrganisation = createAction(
  AuthActionTypes.CreateOrganisation,
  props<{ organisation: CreateOrganisationDTO }>(),
);

export const CreateOrganisationSuccess = createAction(
  AuthActionTypes.CreateOrganisationSuccess,
  props<{ organisation: Organisation }>(),
);

export const CreateOrganisationFailure = createAction(
  AuthActionTypes.CreateOrganisationFailure,
  props<{ error: any }>(),
);
