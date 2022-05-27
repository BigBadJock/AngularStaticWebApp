import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { PaginationComponent } from 'ngx-bootstrap/pagination';

import { DatagridComponent } from './datagrid.component';
import { GridComponent } from './grid/grid.component';
import { ColumnDefinition } from './models/column-definition.model';

const colDef: ColumnDefinition = {
  dataType: 'string',
  header: 'test',
  name: 'testCol',
};

const testData = [{ test: 'test 1' }, { test: 'test 2' }];

describe('DatagridComponent', () => {
  let component: DatagridComponent;
  let fixture: ComponentFixture<DatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatagridComponent, MockComponent(GridComponent), MockComponent(PaginationComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridComponent);
    component = fixture.componentInstance;
    component.columnDefinitions = [colDef];
    component.data = testData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
