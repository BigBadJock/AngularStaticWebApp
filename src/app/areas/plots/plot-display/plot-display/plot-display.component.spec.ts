import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotDisplayComponent } from './plot-display.component';

describe('PlotDisplayComponent', () => {
  let component: PlotDisplayComponent;
  let fixture: ComponentFixture<PlotDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
