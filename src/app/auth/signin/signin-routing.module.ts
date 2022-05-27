import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninShellComponent } from './signin-shell/signin-shell.component';

const routes: Routes = [
  {
    path: '',
    component: SigninShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule {}
