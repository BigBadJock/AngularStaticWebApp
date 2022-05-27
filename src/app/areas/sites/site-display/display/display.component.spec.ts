import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { PlotWithRentals } from 'src/app/models/plotWithRentals.model';
import { Site } from 'src/app/models/site.model';
import { DatagridComponent } from 'src/app/shared/datagrid/datagrid.component';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { PlotWithRentalsEntityService } from '../../../../store/plotWithRentals-entity.service';

import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayComponent, MockComponent(CardComponent), MockComponent(DatagridComponent), MockComponent(UiModalComponent)],
      imports:[NgbPopoverModule],
      providers: [PlotWithRentalsEntityService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    component.site = new Site();
    const plot = new PlotWithRentals();
    component.plots = [plot];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
