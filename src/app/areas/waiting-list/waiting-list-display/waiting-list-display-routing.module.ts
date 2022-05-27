import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingListDisplayShellComponent } from './waiting-list-display-shell/waiting-list-display-shell.component';


const routes: Routes = [
  {
    path: ':id',
    component: WaitingListDisplayShellComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingListDisplayRoutingModule {}
