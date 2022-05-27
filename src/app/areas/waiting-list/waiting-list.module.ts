import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingListRoutingModule } from './waiting-list-routing.module';
import { AllotmentStoreModule } from 'src/app/store/allotment-store.module';
import { WaitingListCreateModule } from './waiting-list-create/waiting-list-create.module';
import { WaitingListUpdateModule } from './waiting-list-update/waiting-list-update.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, WaitingListRoutingModule, AllotmentStoreModule, WaitingListCreateModule, WaitingListUpdateModule,],
})
export class WaitingListModule {
  constructor() {}

}
