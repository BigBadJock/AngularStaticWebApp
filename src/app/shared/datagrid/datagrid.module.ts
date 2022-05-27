import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { DatagridComponent } from './datagrid.component';
import { GridComponent } from './grid/grid.component';
import { GridcellComponent } from './gridcell/gridcell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DatagridComponent, GridComponent, GridcellComponent],
  imports: [CommonModule, PaginationModule, FormsModule, RouterModule],
  exports: [DatagridComponent],
})
export class DatagridModule {}
