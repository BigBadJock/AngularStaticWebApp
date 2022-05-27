import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteCreateRoutingModule } from './site-create-routing.module';
import { SiteCreateShellComponent } from './site-create-shell/site-create-shell.component';
import { SiteCreateDisplayComponent } from './site-create-display/site-create-display.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [SiteCreateShellComponent, SiteCreateDisplayComponent],
  imports: [
    CommonModule,
    SharedModule,
    SiteCreateRoutingModule,
    
  ]
})
export class SiteCreateModule { }
