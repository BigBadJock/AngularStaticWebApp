import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotUpdateShellComponent } from './plot-update-shell.component';

describe('PlotUpdateShellComponent', () => {
  let component: PlotUpdateShellComponent;
  let fixture: ComponentFixture<PlotUpdateShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotUpdateShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotUpdateShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
