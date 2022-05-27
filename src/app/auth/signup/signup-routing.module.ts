import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupShellComponent } from './signup-shell/signup-shell.component';

const routes: Routes = [
  {
    path: '',
    component: SignupShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
