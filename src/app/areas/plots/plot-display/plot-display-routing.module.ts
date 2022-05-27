import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlotDisplayShellComponent } from './plot-display-shell/plot-display-shell.component';

const routes: Routes = [
  {
    path: ':id/:siteName',
    component: PlotDisplayShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlotDisplayRoutingModule { }
