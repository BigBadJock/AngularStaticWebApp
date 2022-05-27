import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupShellComponent } from './setup-shell/setup-shell.component';

const routes: Routes = [
  {
    path: '',
    component: SetupShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
