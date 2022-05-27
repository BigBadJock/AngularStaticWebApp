import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SiteRoutingModule } from './site.routing.module';
import { AllotmentStoreModule } from 'src/app/store/allotment-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SiteRoutingModule,
    RouterModule,
    AllotmentStoreModule,
  ],
})
export class SitesModule {}
