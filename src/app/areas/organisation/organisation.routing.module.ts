import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth-guard';
import { OrganisationResolver } from './store/organisation.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'configuration',
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then((module) => module.ConfigurationModule),
    resolve: {
      organisation: OrganisationResolver,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationRoutingModule {}
