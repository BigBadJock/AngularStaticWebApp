import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotDisplayRoutingModule } from './plot-display-routing.module';
import { PlotDisplayShellComponent } from './plot-display-shell/plot-display-shell.component';
import { PlotDisplayComponent } from './plot-display/plot-display.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CurrentTenantComponent } from './current-tenant/current-tenant.component';
import { PlotDetailsComponent } from './plot-details/plot-details.component';
import { DatagridModule } from 'src/app/shared/datagrid/datagrid.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlotUpdateModule } from '../plot-update/plot-update.module';


@NgModule({
  declarations: [
    PlotDisplayShellComponent,
    PlotDisplayComponent,
    CurrentTenantComponent,
    PlotDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlotDisplayRoutingModule,
    DatagridModule,
    NgbModule,
    PlotUpdateModule
  ]
})
export class PlotDisplayModule { }
