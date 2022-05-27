import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotDisplayShellComponent } from './plot-display-shell.component';

describe('PlotDisplayShellComponent', () => {
  let component: PlotDisplayShellComponent;
  let fixture: ComponentFixture<PlotDisplayShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotDisplayShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotDisplayShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
