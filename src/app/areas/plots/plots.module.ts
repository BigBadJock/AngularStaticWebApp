import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotsRoutingModule } from './plots-routing.module';
import { AllotmentStoreModule } from 'src/app/store/allotment-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlotsRoutingModule,
    AllotmentStoreModule,
  ],

})
export class PlotsModule {}
