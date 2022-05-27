import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgottenPasswordShellComponent } from './forgotten-password-shell/forgotten-password-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPasswordShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPasswordRoutingModule {}
