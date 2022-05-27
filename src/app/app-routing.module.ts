import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
//        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./areas/dashboard/dashboard.module').then((module) => module.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'organisation',
        loadChildren: () =>
          import('./areas/organisation/organisation.module').then((module) => module.OrganisationModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'payments',
        loadChildren: () => import('./areas/payments/payments.module').then((module) => module.PaymentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'sites',
        loadChildren: () => import('./areas/sites/sites.module').then((module) => module.SitesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'plots',
        loadChildren: () => import('./areas/plots/plots.module').then((module) => module.PlotsModule),
        //canActivate: [AuthGuard],
      },
      {
        path: 'waitinglist',
        loadChildren: () =>
          import('./areas/waiting-list/waiting-list.module').then((module) => module.WaitingListModule),
        canActivate: [AuthGuard],
      },
      // {
      //   path: '**',
      //   component: PageNotFoundComponent,
      // },
    ],
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/signup/signup.module').then((module) => module.SignupModule),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'signin',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/signin/signin.module').then((module) => module.SigninModule),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'resetpassword',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/reset-password/reset-password.module').then((module) => module.ResetPasswordModule),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'forgottenPassword',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/forgotten-password/forgotten-password.module').then(
            (module) => module.ForgottenPasswordModule,
          ),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'setup',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/setup/setup.module').then((module) => module.SetupModule),
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
