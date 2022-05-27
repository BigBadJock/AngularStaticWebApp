import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordShellComponent } from './reset-password-shell/reset-password-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
