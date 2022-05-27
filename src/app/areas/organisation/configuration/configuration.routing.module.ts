import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationShellComponent } from './configuration-shell/configuration-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
