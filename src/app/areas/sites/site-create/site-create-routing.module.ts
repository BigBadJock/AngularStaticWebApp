import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteCreateShellComponent } from './site-create-shell/site-create-shell.component';

const routes: Routes = [
  {
    path: '',
    component: SiteCreateShellComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteCreateRoutingModule { }
