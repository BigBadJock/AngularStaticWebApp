import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((module) => module.SignupModule),
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then((module) => module.SigninModule),
    pathMatch: 'full',
  },
  {
    path: 'forgottenPassword',
    loadChildren: () =>
      import('./forgotten-password/forgotten-password.module').then((module) => module.ForgottenPasswordModule),
    pathMatch: 'full',
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./reset-password/reset-password.module').then((module) => module.ResetPasswordModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
