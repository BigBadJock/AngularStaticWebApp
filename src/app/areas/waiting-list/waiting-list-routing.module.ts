import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./waiting-list-search/waiting-list-search.module').then((module) => module.WaitingListSearchModule),
  },
  {
    path: 'display',
    loadChildren: () =>
      import('./waiting-list-display/waiting-list-display.module').then((module) => module.WaitingListDisplayModule),
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingListRoutingModule {}
