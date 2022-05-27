import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteDisplayShellComponent } from './site-display-shell/site-display-shell.component';

const routes: Routes = [
  {
    path: ':id',
    component: SiteDisplayShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteDisplayRoutingModule {}
