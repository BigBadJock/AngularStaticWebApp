import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApexChartComponent } from './apex-chart.component';
import { ApexChartService } from './apex-chart.service';

describe('ApexChartComponent', () => {
  let component: ApexChartComponent;
  let fixture: ComponentFixture<ApexChartComponent>;
  let chartID: string;
  let chartConfig: any;
  let xAxis: any;
  let newData: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ApexChartComponent],
        providers: [ApexChartService],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApexChartComponent);
    component = fixture.componentInstance;
    component.chartID = chartID;
    component.chartConfig = chartConfig;
    component.xAxis = xAxis;
    component.newData = newData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
