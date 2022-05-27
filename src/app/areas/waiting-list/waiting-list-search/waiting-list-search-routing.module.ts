import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingListSearchShellComponent } from './components/waiting-list-search-shell/waiting-list-search-shell.component';

const routes: Routes = [{ path: '', component: WaitingListSearchShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingListSearchRoutingModule {}
