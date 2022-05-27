import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteModifyRoutingModule } from './site-modify-routing.module';
import { SiteModifyShellComponent } from './site-modify-shell/site-modify-shell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteModifyDisplayComponent } from './site-modify-display/site-modify-display.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [
    SiteModifyShellComponent,
    SiteModifyDisplayComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    SiteModifyRoutingModule
  ]
})
export class SiteModifyModule { }
