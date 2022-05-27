import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnDefinition } from '../models/column-definition.model';
import { PageControl } from '../models/pageControl.model';

import { GridComponent } from './grid.component';

const colDef: ColumnDefinition = {
  dataType: 'string',
  header: 'test',
  name: 'testCol',
};

const testData = [{ test: 'test 1' }, { test: 'test 2' }];

const pageControl = new PageControl();

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;

    component.columnDefinitions = [colDef];
    component.data = testData;
    component.pagination = pageControl;

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should build headers from column definitions', () => {
    pending();
  });

  test('should iterate through data and build rows and columns', () => {
    pending();
  });
});
