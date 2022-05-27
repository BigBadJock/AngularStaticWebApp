export class ResetPasswordCredentials {
  constructor(public userEmail: string, public password: string, public resetPasswordToken: string) {}
}
