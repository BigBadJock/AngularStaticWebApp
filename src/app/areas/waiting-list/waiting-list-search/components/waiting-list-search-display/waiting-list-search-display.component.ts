import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { ColumnDefinition } from 'src/app/shared/datagrid/models/column-definition.model';

@Component({
  selector: 'app-waiting-list-search-display',
  templateUrl: './waiting-list-search-display.component.html',
  styleUrls: ['./waiting-list-search-display.component.scss']
})
export class WaitingListSearchDisplayComponent implements OnInit {
  @Input() waitingList: WaitingList[];
  @Output() addClicked = new EventEmitter();
  
  columnDefinitions: ColumnDefinition[];

  constructor() {
  }

  ngOnInit(): void {
    this.columnDefinitions = [
        { name: 'title', header: 'Title', dataType: 'string',},
        { name: 'firstName', header: 'First Name', dataType: 'string' },
        { name: 'lastName', header: 'Last Name', dataType: 'link', routerLink: '/waitinglist/display/' },
        { name: 'phone', header: 'Phone', dataType: 'string' },
        { name: 'email', header: 'Email', dataType: 'string' },
        { name: 'created', header: 'Created', dataType: 'date' },
      ];
  }

  addClick() {
    this.addClicked.emit("true");
  }
}
