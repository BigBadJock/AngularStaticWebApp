import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteResolver } from './SiteResolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
  },
  {
    path: 'search',
    loadChildren: () => import('./site-search/site-search.module').then((module) => module.SiteSearchModule),
  },
  {
    path: 'display',
    loadChildren: () => import('./site-display/site-display.module').then((module) => module.SiteDisplayModule),
  },
  {
    path: 'create',
    loadChildren:()=>import('./site-create/site-create.module').then((module)=>module.SiteCreateModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
