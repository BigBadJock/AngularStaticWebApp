import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { ColumnDefinition } from './models/column-definition.model';
import { PageControl } from './models/pageControl.model';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnChanges {
  @Input() columnDefinitions: ColumnDefinition[];

  @Input() data: any[];

  pagination = new PageControl();

  @Output() pageChanged: EventEmitter<PageControl> = new EventEmitter<PageControl>();

  ngOnChanges() {
    this.pagination = new PageControl();
    this.pagination.page = 1;
    this.pagination.pageSize = 10;
    
    this.pagination.recordCount = this.data?.length;
  }

  paginationChanged(event: PageChangedEvent) {
    this.pagination.page = event.page;
    this.pageChanged.emit(this.pagination);
  }
}
