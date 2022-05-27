import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingListSearchRoutingModule } from './waiting-list-search-routing.module';
import { WaitingListSearchShellComponent } from './components/waiting-list-search-shell/waiting-list-search-shell.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DatagridModule } from 'src/app/shared/datagrid/datagrid.module';
import { WaitingListSearchDisplayComponent } from './components/waiting-list-search-display/waiting-list-search-display.component';
import { WaitingListCreateModule } from '../waiting-list-create/waiting-list-create.module';

@NgModule({
  declarations: [WaitingListSearchShellComponent, WaitingListSearchDisplayComponent],
  imports: [CommonModule, WaitingListSearchRoutingModule, SharedModule, DatagridModule, WaitingListCreateModule],
})
export class WaitingListSearchModule {}
