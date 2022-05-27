import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnDefinition } from '../models/column-definition.model';

import { GridcellComponent } from './gridcell.component';

describe('GridcellComponent', () => {
  let component: GridcellComponent;
  let fixture: ComponentFixture<GridcellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridcellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridcellComponent);
    component = fixture.componentInstance;

    const colDef: ColumnDefinition = {
      dataType: 'string',
      header: 'test',
      name: 'testCol',
    };

    component.columnDefinition = colDef;
    component.data = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
