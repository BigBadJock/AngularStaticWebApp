import { Component, Input, OnInit } from '@angular/core';
import { ColumnDefinition } from '../models/column-definition.model';
import { PageControl } from '../models/pageControl.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() columnDefinitions: ColumnDefinition[];

  @Input() data: any[];

  @Input() pagination: PageControl;

  constructor() {}

  ngOnInit(): void {}
}
