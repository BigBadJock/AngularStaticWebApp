import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DatagridModule } from 'src/app/shared/datagrid/datagrid.module';
import { SiteDisplayRoutingModule } from './site-display-routing.module';
import { SiteDisplayShellComponent } from './site-display-shell/site-display-shell.component';
import { DisplayComponent } from './display/display.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteModifyModule } from '../site-modify/site-modify.module';


@NgModule({
  declarations: [SiteDisplayShellComponent, DisplayComponent],
  imports: [
    CommonModule,
    SiteDisplayRoutingModule,
    RouterModule,
    SharedModule,
    DatagridModule,
    NgbModule,
    SiteModifyModule],
})
export class SiteDisplayModule {}
