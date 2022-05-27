import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotUpdateDisplayComponent } from './plot-update-display.component';

describe('PlotUpdateDisplayComponent', () => {
  let component: PlotUpdateDisplayComponent;
  let fixture: ComponentFixture<PlotUpdateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotUpdateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotUpdateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
