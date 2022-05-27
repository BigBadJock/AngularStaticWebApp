import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteSearchShellComponent } from './site-search-shell/site-search-shell.component';

const routes: Routes = [{ path: '', component: SiteSearchShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteSearchRoutingModule {}
